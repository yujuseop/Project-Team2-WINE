import React, { useState } from "react";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import styles from "./ReviewCardList.module.css";

interface Review {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  lightBold: number | null;
  smoothTannic: number | null;
  drySweet: number | null;
  softAcidic: number | null;
  user: {
    nickname: string | null;
    image: string | null;
  };
  isLiked: boolean;
}

interface ReviewListProps {
  reviews: Review[];
  wineId: number;
  onReviewSubmit: (newReview: Review) => void;
}

const ReviewCardList: React.FC<ReviewListProps> = ({
  reviews,
  wineId,
  onReviewSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  // reviews가 undefined 또는 null일 경우 빈 배열로 처리
  const safeReviews = (reviews || []).map((review) => ({
    ...review,
    user: review?.user ?? {
      nickname: "익명",
      image: "/assets/icon/user_empty_img.svg",
    },
  }));

  return (
    <>
      <div className={styles.review_list_container}>
        {safeReviews.length > 0 ? (
          <h1 className={styles.review_title}>리뷰 목록</h1>
        ) : (
          <h1 className={styles.no_review_title}>리뷰 목록</h1>
        )}
        {/* 리뷰 목록 */}
        {safeReviews.length > 0 ? (
          safeReviews.map((review) => {
            // user 객체가 없을 경우 기본값 설정
            const user = review.user || {
              nickname: "익명",
              image: "/assets/icon/user_empty_img.svg",
            };

            return (
              <ReviewCard
                key={review.id}
                review={{ ...review, user }} // user가 없을 경우 기본값을 설정
              />
            );
          })
        ) : (
          <>
            <div className={styles.empty_message}>
              <div className={styles.empty_message_img}>
                <Image
                  src="/assets/images/no_review.svg"
                  alt="리뷰 없음"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <p>작성된 리뷰가 없어요</p>
              <ReviewButton
                className={styles.review_button}
                type="button"
                onClick={handleModalToggle}
              >
                리뷰 남기기
              </ReviewButton>
            </div>
          </>
        )}
      </div>

      {/* 리뷰 모달 */}
      {isModalOpen && (
        <ReviewModal
          wineId={wineId}
          onClose={handleModalToggle}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default ReviewCardList;
