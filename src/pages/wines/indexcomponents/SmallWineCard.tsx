import React from "react";
import Image from "next/image";  // 수정: next/image에서 Image 컴포넌트 import
import styles from "./SmallWineCard.module.css";
import { FaStar } from "react-icons/fa";

interface SmallWineCardProps {
  name: string;
  rating: number;
  image: string;
}

const SmallWineCard: React.FC<SmallWineCardProps> = ({ name, rating, image }) => {
  return (
    <div className={styles.wine_card}>
      {/* 수정: <img> 태그를 <Image> 컴포넌트로 변경 */}
      <Image src={image} alt={name} className={styles.wine_image} width={100} height={150} />
      <div className={styles.rating}>{rating.toFixed(1)}</div>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} className={i < Math.floor(rating) ? styles.star_filled : styles.star_empty} />
        ))}
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default SmallWineCard;
