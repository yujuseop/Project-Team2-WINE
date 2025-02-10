import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";  // 수정: next/image에서 Image 컴포넌트 import
import styles from "./WineCard.module.css";
import { FaStar, FaArrowRight } from "react-icons/fa";

interface WineCardProps {
  id: number;
  name: string;
  rating: number;
  image: string;
  region: string;
  price: number;
  reviews: number;
  latestReview: string;
}

const WineCard: React.FC<WineCardProps> = ({ id, name, rating, image, region, price, reviews, latestReview }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/wines/${id}`);  // 상세 페이지로 이동
  };

  return (
    <div className={styles.wine_card} onClick={handleCardClick}>
      <div className={styles.card_top}>
        {/* 수정: <img> 태그를 <Image> 컴포넌트로 변경 */}
        <Image src={image} alt={name} className={styles.wine_image} width={100} height={150} />

        <div className={styles.info_section}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.region}>{region}</p>
          <div className={styles.price}>₩ {price.toLocaleString()}</div>
        </div>

        <div className={styles.rating_section}>
          <div className={styles.rating}>{rating.toFixed(1)}</div>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={i < Math.floor(rating) ? styles.star_filled : styles.star_empty} />
            ))}
          </div>
          <p className={styles.reviews}>{reviews}개의 후기</p>
          <FaArrowRight className={styles.arrow_icon} />
        </div>
      </div>

      <div className={styles.latest_review_section}>
        <h3>최신 후기</h3>
        <p>{latestReview}</p>
      </div>
    </div>
  );
};

export default WineCard;
