import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./RatingSummary.module.css";

interface Review {
  rating: number;
}

interface RatingSummaryProps {
  reviews: Review[];
  avgRatings: { [key: string]: number }; // 평점별 개수
}

export default function RatingSummary({
  reviews,
  avgRatings,
}: RatingSummaryProps) {
  if (!reviews || reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(1);
  const roundedRating = Math.floor(Number(avgRating));

  return (
    <div className={styles.summaryContainer}>
      <h2>{avgRating}</h2>
      <div className={styles.starsContainer}>
        {Array.from({ length: 5 }, (_, i) =>
          i < roundedRating ? (
            <FaStar key={i} color="gold" size={20} />
          ) : (
            <FaRegStar key={i} color="gray" size={20} />
          )
        )}
      </div>
      <p className={styles.reviewCount}>
        {totalReviews.toLocaleString()}개의 후기
      </p>

      <div className={styles.ratingBarContainer}>
        {Array.from({ length: 5 }, (_, i) => {
          const score = 5 - i;
          const percentage = totalReviews
            ? (avgRatings[score] / totalReviews) * 100
            : 0;
          return (
            <div
              key={score}
              className={styles.ratingBar}
              style={{ "--width": `${percentage}%` } as React.CSSProperties}
            >
              <span>{score}점</span>
              <div />
            </div>
          );
        })}
      </div>

      <button className={styles.submitButton}>리뷰 남기기</button>
    </div>
  );
}
