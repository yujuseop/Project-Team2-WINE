import React from "react";
import styles from "./ReviewCard.module.css";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";

// 리뷰 타입 정의
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
    name: string | null;
    profileImage: string | null;
  } | null;
  isLiked: boolean;
}

// Props 타입 설정
interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const user = review.user ?? { name: "Anonymous", profileImage: "" };

  // 모든 특성이 0인지 확인
  const hasCharacteristics =
    review.lightBold > 0 ||
    review.smoothTannic > 0 ||
    review.drySweet > 0 ||
    review.softAcidic > 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user_container}>
          {user.profileImage ? (
            <Image
              className={styles.profile_img}
              src={user.profileImage}
              alt="profile"
              width={64}
              height={64}
              priority
            />
          ) : (
            <div className={styles.default_profile} />
          )}
          <div>
            <p className={styles.user_name}>{user.name}</p>
            <small className={styles.timestamp}>{review.createdAt}</small>
          </div>
        </div>
        <BsThreeDots className={styles.menu_icon} />
      </div>

      {/* aroma와 rating을 같은 줄에 배치하고 space-between 적용 */}
      <div className={styles.aroma_rating_container}>
        <div className={styles.aroma_tags}>
          {review.aroma.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.rating}>
          {/* rating을 소수점 1자리까지 표시 */}
          <span>{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className={styles.review_text}>{review.content}</p>

      {hasCharacteristics && (
        <div className={styles.characteristics}>
          <div className={styles.characteristic}>
            <span>바디감</span>
            <input
              type="range"
              min="0"
              max="10"
              value={review.lightBold}
              readOnly
            />
          </div>
          <div className={styles.characteristic}>
            <span>타닌</span>
            <input
              type="range"
              min="0"
              max="10"
              value={review.smoothTannic}
              readOnly
            />
          </div>
          <div className={styles.characteristic}>
            <span>당도</span>
            <input
              type="range"
              min="0"
              max="10"
              value={review.drySweet}
              readOnly
            />
          </div>
          <div className={styles.characteristic}>
            <span>산미</span>
            <input
              type="range"
              min="0"
              max="10"
              value={review.softAcidic}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
