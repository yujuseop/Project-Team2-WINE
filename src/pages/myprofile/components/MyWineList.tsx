import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import styles from "./MyWineList.module.css";
import CustomSelect from "@/components/CustomSelect";
import TwoButton from "./TwoButton";
import Image from "next/image";
import EditWineRegisterModal from "./EditWineRegisterModal"; // 와인 수정 모달 추가

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
  const limit = 10;

  // 와인 목록 가져오기
  const fetchMyWines = async () => {
    try {
      const response = await axios.get<{ list: Wine[] }>("/users/me/wines", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);

      if (!response.data.list || !Array.isArray(response.data.list)) {
        console.error("잘못된 응답 형식:", response.data);
        return;
      }

      // 최신순 정렬 (이름 기준 내림차순 정렬)
      const sortedWines = response.data.list.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      setMyWines(sortedWines);
    } catch (error) {
      console.error("와인 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 와인 삭제
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

  // 수정 모달 열기
  const openEditModal = (wine: Wine) => {
    setSelectedWine(wine);
    setShowEditModal(true);
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedWine(null);
  };

  // 와인 수정 요청
  const updateWine = async (updatedWine: Partial<Wine>) => {
    console.log("업데이트 요청 데이터:", updatedWine);

    const payload: Partial<Wine> = {
      name: updatedWine.name,
      region: updatedWine.region,
      image: updatedWine.image,
      price: updatedWine.price,
      type: updatedWine.type as "RED" | "WHITE" | "SPARKLING",
    };

    try {
      await axios.patch(`/wines/${updatedWine.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMyWines((prevWines) =>
        prevWines.map((wine) =>
          wine.id === updatedWine.id ? { ...wine, ...payload } : wine
        )
      );

      setShowEditModal(false);
    } catch (error) {
      console.error("와인 수정 중 오류 발생:", error);
      alert("와인 수정에 실패했습니다.");
    }
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
                        openDeleteModal(wine.id);
                      } else if (option === "수정하기") {
                        openEditModal(wine);
                      }
                    }}
                  />
                </div>
                <p className={styles.region}>{wine.region}</p>
                <p className={styles.price}>
                  {" "}
                  ₩ {(wine.price ?? 0).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>등록한 와인이 없습니다.</p>
      )}

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TwoButton onCancel={closeDeleteModal} onConfirm={deleteWine} />
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && selectedWine && (
        <EditWineRegisterModal
          onClose={closeEditModal}
          onSubmit={updateWine}
          initialData={selectedWine}
        />
      )}
    </div>
  );
}
