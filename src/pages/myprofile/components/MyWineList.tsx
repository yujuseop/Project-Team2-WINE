import React, { useEffect, useState, useCallback } from "react";
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
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [imgSrcs, setImgSrcs] = useState<{ [key: number]: string }>({}); // ✅ 이미지 상태 배열

  // 와인 목록 가져오기
  const fetchMyWines = useCallback(async () => {
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

      setMyWines((prevWines) =>
        limit === 10 ? sortedWines : [...prevWines, ...sortedWines]
      );

      // 초기 이미지 상태 설정
      const initialImgSrcs: { [key: number]: string } = {};
      sortedWines.forEach((wine) => {
        initialImgSrcs[wine.id] = wine.image || "/assets/icon/empty_img.png";
      });
      setImgSrcs(initialImgSrcs);

      setHasMore(response.data.list.length === limit);
    } catch (error) {
      console.error("와인 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchMyWines();
  }, [fetchMyWines]);

  return (
    <div className={styles.container}>
      {loading && myWines.length === 0 ? (
        <p>로딩 중...</p>
      ) : myWines.length > 0 ? (
        <>
          <ul className={styles.list}>
            {myWines.map((wine) => (
              <li key={wine.id} className={styles.wine_cards}>
                <div
                  className={styles.wine_img}
                  onClick={() => router.push(`/wines/${wine.id}`)}
                >
                  <Image
                    className={styles.img}
                    src={imgSrcs[wine.id] || "/assets/icon/empty_img.png"}
                    fill
                    alt="wine image"
                    priority
                    onError={() =>
                      setImgSrcs((prev) => ({
                        ...prev,
                        [wine.id]: "/assets/icon/empty_img.png",
                      }))
                    }
                    onLoadingComplete={(result) => {
                      if (result.naturalWidth === 0) {
                        setImgSrcs((prev) => ({
                          ...prev,
                          [wine.id]: "/assets/icon/empty_img.png",
                        }));
                      }
                    }}
                  />
                </div>
                <div
                  className={styles.wine_info}
                  onClick={() => router.push(`/wines/${wine.id}`)}
                >
                  <div className={styles.header}>
                    <p className={styles.wine_name}>{wine.name}</p>
                  </div>
                  <p className={styles.region}>{wine.region}</p>
                  <p className={styles.price}>
                    ₩ {wine.price.toLocaleString()}
                  </p>
                </div>
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
                  className={styles.customSelect}
                />
              </li>
            ))}
          </ul>

          {hasMore && (
            <PrimaryButton
              className={styles.load_more}
              onClick={() => setLimit((prev) => prev + 10)}
            >
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
              const { id, ...payload } = updatedWine;
              await axios.patch(`/wines/${id}`, payload, {
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
