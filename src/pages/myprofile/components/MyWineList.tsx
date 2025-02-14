import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import styles from "./MyWineList.module.css";
import CustomSelect from "@/components/CustomSelect";
import TwoButton from "./TwoButton";

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
  const limit = 10;

  // 와인 목록 가져오기
  const fetchMyWines = async () => {
    try {
      const response = await axios.get<{
        list: Wine[];
        totalCount: number;
        nextCursor: null;
      }>("/users/me/wines", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);

      if (!response.data.list || !Array.isArray(response.data.list)) {
        console.error("잘못된 응답 형식:", response.data);
        return;
      }

      setMyWines(response.data.list);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 와인 삭제 함수
  const deleteWine = async () => {
    if (!selectedWineId) return;

    try {
      await axios.delete(`/wines/${selectedWineId}`);
      setMyWines((prevWines) =>
        prevWines.filter((wine) => wine.id !== selectedWineId)
      );
      setShowDeleteModal(false);
      setSelectedWineId(null);
    } catch (error) {
      console.error("와인 삭제 중 오류 발생:", error);
      alert("와인 삭제에 실패했습니다.");
    }
  };

  // 삭제 모달 열기
  const openDeleteModal = (wineId: number) => {
    setSelectedWineId(wineId);
    setShowDeleteModal(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedWineId(null);
  };

  // 해당 와인 페이지로 이동
  const navigateToWine = (wineId: number) => {
    router.push(`/wines/${wineId}`);
  };

  useEffect(() => {
    fetchMyWines();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>로딩 중...</p>
      ) : myWines.length > 0 ? (
        <ul className={styles.list}>
          {myWines.map((wine) => (
            <li key={wine.id} className={styles.wine_cards}>
              <img
                className={styles.wine_img}
                src={wine.image}
                alt="wine image"
              />
              <div className={styles.wine_info}>
                <div className={styles.header}>
                  <p
                    className={styles.wine_name}
                    onClick={() => navigateToWine(wine.id)}
                  >
                    {wine.name}
                  </p>
                  <CustomSelect
                    options={["삭제하기", "수정하기"]}
                    onChange={(option) => {
                      if (option === "삭제하기") {
                        openDeleteModal(wine.id);
                      }
                    }}
                  />
                </div>

                <p
                  className={styles.region}
                  onClick={() => navigateToWine(wine.id)}
                >
                  {wine.region}
                </p>
                <p className={styles.price}>₩ {wine.price.toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>등록한 와인이 없습니다.</p>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TwoButton onCancel={closeDeleteModal} onConfirm={deleteWine} />
          </div>
        </div>
      )}
    </div>
  );
}
