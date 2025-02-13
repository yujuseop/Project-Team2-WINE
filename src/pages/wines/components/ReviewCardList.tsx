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
}

const ReviewCardList: React.FC<ReviewListProps> = ({ reviews }) => {
  // 모달오픈 위한 useState사용
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  const handleReviewSubmit = (reviewContent: string) => {
    // 서버에 리뷰 제출 로직을 추가하세요  -> 추후 추가예정
    console.log("리뷰 제출:", reviewContent);
  };

  return (
    <>
      <div className={styles.review_list_container}>
        {reviews.length > 0 ? (
          <h1 className={styles.review_title}>리뷰 목록</h1>
        ) : (
          <h1 className={styles.no_review_title}>리뷰 목록</h1>
        )}
        {/* 목록 */}
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
      {/* // 리뷰 모달 */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default ReviewCardList;
