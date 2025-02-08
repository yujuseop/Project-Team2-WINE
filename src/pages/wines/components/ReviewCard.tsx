import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import TimeAgo from "@/components/TimeAgo";
import styles from "./ReviewCard.module.css";

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
    nickname: string | null;
    image: string | null;
  } | null;
  isLiked: boolean;
}

// Props 타입 설정
interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const user =
    review.user && typeof review.user === "object"
      ? review.user
      : {
          nickname: "Anonymous",
          image: "/assets/icon/user_empty_img.svg",
        };

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
          <Image
            className={styles.profile_img}
            src={user.image ?? ""}
            alt="profile"
            width={64}
            height={64}
            priority
          />
          <div>
            <p className={styles.user_nickname}>{user.nickname}</p>
            <TimeAgo date={review.createdAt} />
          </div>
        </div>
        <div className={styles.icon}>
          <FaRegHeart className={styles.heart} />
          <BsThreeDotsVertical className={styles.dropdown} />
        </div>
      </div>

      <div className={styles.aroma_rating_container}>
        <div className={styles.aroma_tags}>
          {review.aroma.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.rating_star} />
          <span> {review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className={styles.review_text}>{review.content}</p>

      {hasCharacteristics && (
        <div className={styles.characteristics}>
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>바디감</span>
            <div className={styles.characteristic_main}>
              <span>가벼워요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.lightBold}
                readOnly
              />
              <span className={styles.characteristic_right}>진해요</span>
            </div>
          </div>
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>타닌</span>
            <div className={styles.characteristic_main}>
              <span>부드러워요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.smoothTannic}
                readOnly
              />
              <span className={styles.characteristic_right}>떫어요</span>
            </div>
          </div>
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>당도</span>
            <div className={styles.characteristic_main}>
              <span>드라이해요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.drySweet}
                readOnly
              />
              <span className={styles.characteristic_right}>달아요</span>
            </div>
          </div>
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>산미</span>
            <div className={styles.characteristic_main}>
              <span>안셔요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.softAcidic}
                readOnly
              />
              <span className={styles.characteristic_right}>많이셔요</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
