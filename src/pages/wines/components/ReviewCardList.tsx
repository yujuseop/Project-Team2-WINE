import { useState } from "react";
import React from "react";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.css";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";

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
}

interface ReviewListProps {
  reviews: Review[];
  wineId: number;
  onReviewSubmit: (newReview: Review) => void; // 부모 컴포넌트에서 새 리뷰를 추가하는 함수
}

const ReviewCardList: React.FC<ReviewListProps> = ({
  reviews,
  wineId,
  onReviewSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className={styles.review_list_container}>
        {reviews.length > 0 ? (
          <h1 className={styles.review_title}>리뷰 목록</h1>
        ) : (
          <h1 className={styles.no_review_title}>리뷰 목록</h1>
        )}
        {/* 리뷰 목록 */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
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
