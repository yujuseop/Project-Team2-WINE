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
  createdAt?: string;
  lightBold?: number;
  smoothTannic?: number;
  drySweet?: number;
  softAcidic?: number;
  user?: User;
  isLiked?: boolean;
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
  const roundedRating = Math.floor(Number(avgRating)); // 평점을 내림하여 별 갯수로 표시

  // 평점별 비율 계산
  const ratingPercentage = (score: number) => {
    return totalReviews ? (avgRatings[score] / totalReviews) * 100 : 0;
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
            const score = 5 - i; // 점수 순서: 5, 4, 3, 2, 1
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
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default RatingSummary;

// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import styles from "./RatingSummary.module.css";
// import ReviewButton from "./ReviewButton"; // default import
// import ReviewModal from "./ReviewModal"; // default import

// interface Review {
//   rating: number;
// }

// interface RatingSummaryProps {
//   reviews: Review[];
//   avgRatings: { [key: string]: number }; // 평점별 개수
//   wineId: number; // wineId를 prop으로 추가
// }

// const RatingSummary = ({ reviews, avgRatings, wineId }: RatingSummaryProps) => {
//   // 모달 오픈을 위한 useState 사용
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleModalToggle = () => setIsModalOpen((prev) => !prev);

//   if (!reviews || reviews.length === 0) return null;

//   const totalReviews = reviews.length;
//   const avgRating = (
//     reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
//   ).toFixed(1);
//   const roundedRating = Math.floor(Number(avgRating));

//   return (
//     <>
//       <div className={styles.container}>
//         {/* 평점(별, 후기) */}
//         <div className={styles.container_rating}>
//           <h2>{avgRating}</h2>
//           <div className={styles.stars_review}>
//             <div className={styles.stars_container}>
//               {Array.from({ length: 5 }, (_, i) =>
//                 i < roundedRating ? (
//                   <FaStar key={i} className={styles.stars} />
//                 ) : (
//                   <FaStar key={i} className={styles.empty_stars} />
//                 )
//               )}
//             </div>
//             <p className={styles.review_count}>
//               {totalReviews.toLocaleString()}개의 후기
//             </p>
//           </div>
//         </div>

//         {/* 평점 비율 */}
//         <div className={styles.rating_bar_container}>
//           {Array.from({ length: 5 }, (_, i) => {
//             const score = 5 - i;
//             const percentage = totalReviews
//               ? (avgRatings[score] / totalReviews) * 100
//               : 0;
//             return (
//               <div
//                 key={score}
//                 className={styles.rating_bar}
//                 style={{ "--width": `${percentage}%` } as React.CSSProperties}
//               >
//                 <span>{score}점</span>
//                 <div />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <ReviewButton
//         className={styles.review_button}
//         type="button"
//         onClick={handleModalToggle}
//       >
//         리뷰 남기기
//       </ReviewButton>

//       {/* 리뷰 모달 */}
//       {isModalOpen && (
//         <ReviewModal
//           wineId={wineId} // wineId 전달
//           onClose={handleModalToggle} // 모달을 닫는 함수 전달
//         />
//       )}
//     </>
//   );
// };

// export default RatingSummary;
