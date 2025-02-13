import React, { useEffect, useState } from "react";
import axios from "@/libs/axios";
import TimeAgo from "@/components/TimeAgo";
import styles from "./MyReviews.module.css";
import CustomSelect from "@/components/CustomSelect";
import TwoButton from "./TwoButton";

interface Wine {
  name: string;
}

interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  wine: Wine;
}

interface ReviewApiResponse {
  list: Review[];
  totalCount: number;
  nextCursor: string | null;
}

export default function MyReviews() {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // 삭제할 리뷰 ID 저장
  const limit = 10;

  // 리뷰 목록 가져오기
  const fetchMyReviews = async () => {
    try {
      const response = await axios.get<ReviewApiResponse>("/users/me/reviews", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);
      setMyReviews(response.data.list);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 삭제 함수
  const deleteReview = async () => {
    if (!selectedReviewId) return;

    try {
      await axios.delete(`/reviews/${selectedReviewId}`);
      setMyReviews((prevReviews) =>
        prevReviews.filter((del) => del.id !== selectedReviewId)
      );
      setShowDeleteModal(false); // 모달 닫기
      setSelectedReviewId(null);
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  // 삭제 모달 열기
  const openDeleteModal = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setShowDeleteModal(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>로딩 중...</p>
      ) : myReviews.length > 0 ? (
        <ul className={styles.list}>
          {myReviews.map((review) => (
            <li key={review.id} className={styles.review_cards}>
              <div className={styles.header}>
                <div className={styles.meta}>
                  <div className={styles.rating}>
                    <img src="/assets/icon/star.svg" alt="star img" />
                    <p>{review.rating}.0</p>
                  </div>
                  <p>
                    <TimeAgo date={review.createdAt} />
                  </p>
                </div>
                <CustomSelect
                  options={["삭제하기", "수정하기"]}
                  onChange={(option) => {
                    if (option === "삭제하기") {
                      openDeleteModal(review.id);
                    }
                  }}
                />
              </div>
              <p className={styles.wine_name}>{review.wine.name}</p>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TwoButton onCancel={closeDeleteModal} onConfirm={deleteReview} />
          </div>
        </div>
      )}
    </div>
  );
}
