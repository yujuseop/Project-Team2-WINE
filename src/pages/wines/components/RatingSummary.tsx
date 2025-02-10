import { FaStar } from "react-icons/fa";
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
          const percentage = totalReviews
            ? (avgRatings[score] / totalReviews) * 100
            : 0;
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
  );
}
