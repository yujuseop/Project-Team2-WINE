import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import styles from "./RatingSummary.module.css";

interface User {
  nickname: string | null;
  image: string | null;
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
  user: User;
  isLiked: boolean;
}

interface RatingSummaryProps {
  reviews: Review[];
  avgRatings: { [key: string]: number };
  wineId: number;
  onReviewSubmit: (newReview: Review) => void;
}

const RatingSummary = ({
  reviews,
  avgRatings,
  wineId,
  onReviewSubmit,
}: RatingSummaryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  if (!reviews || reviews.length === 0) return null;

  // 총 리뷰 수와 평균 평점 계산
  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(1);
  const roundedRating = Math.floor(Number(avgRating));

  // 평점별 비율 계산
  const ratingPercentage = (score: number) => {
    return totalReviews ? (avgRatings[score] / totalReviews) * 100 : 0;
  };

  // ✅ 리뷰 제출 시 undefined 값 방지
  const handleSubmitReview = (newReview: Review) => {
    const completeReview: Review = {
      ...newReview,
      createdAt: newReview.createdAt || new Date().toISOString(),
      lightBold: newReview.lightBold ?? 0,
      smoothTannic: newReview.smoothTannic ?? 0,
      drySweet: newReview.drySweet ?? 0,
      softAcidic: newReview.softAcidic ?? 0,
    };
    onReviewSubmit(completeReview);
  };

  return (
    <>
      <div className={styles.container}>
        {/* 평점(별, 후기) */}
        <div className={styles.container_rating}>
          <h2>{avgRating}</h2>
          <div className={styles.stars_review}>
            <div className={styles.stars_container}>
              {Array.from({ length: 5 }, (_, i) =>
                i < roundedRating ? (
                  <FaStar key={i} className={styles.stars} />
                ) : (
                  <FaStar key={i} className={styles.empty_stars} />
                )
              )}
            </div>
            <p className={styles.review_count}>
              {totalReviews.toLocaleString()}개의 후기
            </p>
          </div>
        </div>

        {/* 평점 비율 */}
        <div className={styles.rating_bar_container}>
          {Array.from({ length: 5 }, (_, i) => {
            const score = 5 - i;
            const percentage = ratingPercentage(score);
            return (
              <div
                key={score}
                className={styles.rating_bar}
                style={{ "--width": `${percentage}%` } as React.CSSProperties}
              >
                <span>{score}점</span>
                <div />
              </div>
            );
          })}
        </div>
      </div>

      {/* 리뷰 작성 버튼 */}
      <ReviewButton
        className={styles.review_button}
        type="button"
        onClick={handleModalToggle}
      >
        리뷰 남기기
      </ReviewButton>

      {/* 리뷰 모달 */}
      {isModalOpen && (
        <ReviewModal
          wineId={wineId}
          onClose={handleModalToggle}
          onReviewSubmit={handleSubmitReview}
        />
      )}
    </>
  );
};

export default RatingSummary;
