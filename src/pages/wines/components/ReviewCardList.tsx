import React from "react";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.css";

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
  return (
    <div className={styles.review_list_container}>
      {/* <h1 className={styles.title}>리뷰 목록</h1> */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <>
            <h1 className={styles.review_title}>리뷰 목록</h1>
            <ReviewCard key={review.id} review={review} />
          </>
        ))
      ) : (
        <>
          <h1 className={styles.no_review_title}>리뷰 목록</h1>
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
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCardList;
