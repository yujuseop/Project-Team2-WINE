import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import TimeAgo from "@/components/TimeAgo";
import Characteristics from "./Characteristics";
import styles from "./ReviewCard.module.css";

// 영어에서 한국어로 변환할 맵핑 객체
const aromaTranslations: { [key: string]: string } = {
  CHERRY: "체리",
  BERRY: "베리",
  OAK: "오크",
  VANILLA: "바닐라",
  PEPPER: "후추",
  BAKING: "제빵",
  GRASS: "풀",
  APPLE: "사과",
  PEACH: "복숭아",
  CITRUS: "시트러스",
  TROPICAL: "트로피컬",
  MINERAL: "미네랄",
  FLOWER: "꽃",
  TOBACCO: "담뱃잎",
  EARTH: "흙",
  CHOCOLATE: "초콜릿",
  SPICE: "스파이스",
  CARAMEL: "카라멜",
  LEATHER: "가죽",
};

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
  // user가 null이거나 undefined일 경우 기본 값 처리
  const user = review.user ?? {
    nickname: "Anonymous",
    image: "/assets/icon/user_empty_img.svg",
  };

  const hasCharacteristics =
    review.lightBold > 0 ||
    review.smoothTannic > 0 ||
    review.drySweet > 0 ||
    review.softAcidic > 0;

  // aroma를 한국어로 변환
  const translatedAroma = review.aroma.map(
    (aroma) => aromaTranslations[aroma] || aroma
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {/* 유저 정보 영역 */}
        <div className={styles.user_container}>
          <div className={styles.profile_img}>
            <Image
              className={styles.img}
              src={user?.image || "/assets/icon/user_empty_img.svg"} // 안전한 기본값 설정
              alt="profile"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className={styles.user_nickname}>
              {user?.nickname || "Anonymous"}
            </p>
            <TimeAgo date={review.createdAt} />
          </div>
        </div>
        {/* react에서 제공하는 아이콘 영역 */}
        <div className={styles.icon}>
          <FaRegHeart className={styles.heart} />
        </div>
      </div>

      {/* aroma 및 평점 영역 */}
      <div className={styles.aroma_rating_container}>
        <div className={styles.aroma_tags}>
          {translatedAroma.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.rating_star} />
          <span> {review.rating}.0</span>
        </div>
      </div>

      <p className={styles.review_text}>{review.content}</p>

      {/* Characteristic 영역 */}
      {hasCharacteristics && (
        <Characteristics
          lightBold={review.lightBold}
          smoothTannic={review.smoothTannic}
          drySweet={review.drySweet}
          softAcidic={review.softAcidic}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default ReviewCard;
