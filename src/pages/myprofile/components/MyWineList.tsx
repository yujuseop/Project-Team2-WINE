import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import styles from "./MyWineList.module.css";
import CustomSelect from "@/components/CustomSelect";
import PrimaryButton from "@/components/PrimaryButton";
import TwoButton from "./TwoButton";
import Image from "next/image";
import EditWineRegisterModal from "./EditWineRegisterModal";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

export default function MyWines() {
  const router = useRouter();
  const [myWines, setMyWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWineId, setSelectedWineId] = useState<number | null>(null);
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [limit, setLimit] = useState(10); // ❗ 상태로 변경
  const [hasMore, setHasMore] = useState(true); // ❗ 더 불러올 데이터가 있는지 여부

  // 와인 목록 가져오기
  const fetchMyWines = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ list: Wine[] }>("/users/me/wines", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);

      if (!response.data.list || !Array.isArray(response.data.list)) {
        console.error("잘못된 응답 형식:", response.data);
        return;
      }

      const sortedWines = response.data.list.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      // 데이터를 기존 리스트에 추가하는 방식으로 변경
      setMyWines((prevWines) =>
        limit === 10 ? sortedWines : [...prevWines, ...sortedWines]
      );

      // 더 불러올 데이터가 있는지 확인
      setHasMore(response.data.list.length === limit);
    } catch (error) {
      console.error("와인 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // "더 보기" 버튼 클릭 시 실행
  const loadMoreWines = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  // 초기 및 limit 변경 시 데이터 로드
  useEffect(() => {
    fetchMyWines();
  }, [limit]);

  return (
    <div className={styles.container}>
      {loading && myWines.length === 0 ? (
        <p>로딩 중...</p>
      ) : myWines.length > 0 ? (
        <>
          <ul className={styles.list}>
            {myWines.map((wine) => (
              <li key={wine.id} className={styles.wine_cards}>
                <div className={styles.wine_img}>
                  <Image
                    className={styles.img}
                    src={wine.image}
                    fill
                    alt="wine image"
                    priority
                  />
                </div>
                <div className={styles.wine_info}>
                  <div className={styles.header}>
                    <p
                      className={styles.wine_name}
                      onClick={() => router.push(`/wines/${wine.id}`)}
                    >
                      {wine.name}
                    </p>
                    <CustomSelect
                      options={["삭제하기", "수정하기"]}
                      onChange={(option) => {
                        if (option === "삭제하기") {
                          setSelectedWineId(wine.id);
                          setShowDeleteModal(true);
                        } else if (option === "수정하기") {
                          setSelectedWine(wine);
                          setShowEditModal(true);
                        }
                      }}
                    />
                  </div>
                  <p className={styles.region}>{wine.region}</p>
                  <p className={styles.price}>
                    ₩ {wine.price.toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* "더 보기" 버튼 (더 불러올 데이터가 있는 경우에만) */}
          {hasMore && (
            <PrimaryButton className={styles.load_more} onClick={loadMoreWines}>
              더 보기
            </PrimaryButton>
          )}
        </>
      ) : (
        <p>등록한 와인이 없습니다.</p>
      )}

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TwoButton
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedWineId(null);
              }}
              onConfirm={async () => {
                if (!selectedWineId) return;
                try {
                  await axios.delete(`/wines/${selectedWineId}`);
                  setMyWines((prev) =>
                    prev.filter((wine) => wine.id !== selectedWineId)
                  );
                  setShowDeleteModal(false);
                  setSelectedWineId(null);
                } catch (error) {
                  console.error("와인 삭제 중 오류 발생:", error);
                  alert("와인 삭제에 실패했습니다.");
                }
              }}
            />
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && selectedWine && (
        <EditWineRegisterModal
          onClose={() => {
            setShowEditModal(false);
            setSelectedWine(null);
          }}
          onSubmit={async (updatedWine: Partial<Wine>) => {
            console.log("업데이트 요청 데이터:", updatedWine);
            try {
              await axios.patch(`/wines/${updatedWine.id}`, updatedWine, {
                headers: { "Content-Type": "application/json" },
              });
              setMyWines((prevWines) =>
                prevWines.map((wine) =>
                  wine.id === updatedWine.id
                    ? { ...wine, ...updatedWine }
                    : wine
                )
              );
              setShowEditModal(false);
            } catch (error) {
              console.error("와인 수정 중 오류 발생:", error);
              alert("와인 수정에 실패했습니다.");
            }
          }}
          initialData={selectedWine}
        />
      )}
    </div>
  );
}
