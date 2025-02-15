import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import TimeAgo from "@/components/TimeAgo";
import styles from "./MyReviews.module.css";
import CustomSelect from "@/components/CustomSelect";
import TwoButton from "./TwoButton";
import EditReviewModal from "./EditReviewModal";

interface Wine {
  id: number;
  name: string;
}

interface Review {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: {
    nickname: string | null;
    image: string | null;
  };
  isLiked: boolean;
  wine: Wine;
}

interface ReviewApiResponse {
  list: Review[];
  totalCount: number;
  nextCursor: string | null;
}

export default function MyReviews() {
  const router = useRouter();
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const limit = 10;

  // 리뷰 목록 가져오기
  const fetchMyReviews = async () => {
    try {
      const response = await axios.get<ReviewApiResponse>("/users/me/reviews", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);

      if (!response.data.list || !Array.isArray(response.data.list)) {
        console.error("잘못된 응답 형식:", response.data);
        return;
      }

      // 최신순 정렬 (createdAt 기준 내림차순)
      const sortedReviews = response.data.list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setMyReviews(sortedReviews);
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
      setShowDeleteModal(false);
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

  //수정 모달 열기
  const openEditModal = (review: Review) => {
    setSelectedReview(review);
    setShowEditModal(true);
  };

  //수정 모달 닫기
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  // 해당 리뷰 와인으로 이동
  const navigateToWine = async (id: number) => {
    router.push(`/wines/${id}`);
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
                    if (option === "수정하기") {
                      openEditModal(review);
                    }
                  }}
                />
              </div>
              {/* 리뷰 클릭 시 해당 와인 페이지로 이동 */}
              <p
                className={styles.wine_name}
                onClick={() => navigateToWine(review.wine.id)}
              >
                {review.wine.name}
              </p>
              <p
                className={styles.content}
                onClick={() => navigateToWine(review.id)}
              >
                {review.content}
              </p>
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

      {/* 수정 모달 */}
      {showEditModal && selectedReview && (
        <EditReviewModal
          wineId={selectedReview.wine.id}
          existingReview={selectedReview}
          isEditing={true}
          onClose={closeEditModal}
          onReviewSubmit={() => {}}
          onReviewUpdate={(updatedReview: Review) => {
            console.log("업데이트된 리뷰 데이터:", updatedReview);

            setMyReviews((prevReviews) => {
              return prevReviews.map((review) =>
                review.id === updatedReview.id
                  ? { ...review, ...updatedReview } // 기존 리뷰를 새로운 데이터로 덮어쓰기
                  : review
              );
            });

            closeEditModal();
          }}
        />
      )}
    </div>
  );
}
