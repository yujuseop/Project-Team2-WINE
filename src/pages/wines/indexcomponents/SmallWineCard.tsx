import React from "react";
import { FaStar } from "react-icons/fa";  // react-icons에서 별 아이콘 가져오기
import styles from "./SmallWineCard.module.css";

interface SmallWineCardProps {
  name: string;
  origin: string;
  image: string;
  rating: number;
}

const SmallWineCard: React.FC<SmallWineCardProps> = ({ name, origin, image, rating }) => {
  return (
    <div className={styles.wine_card}>
      <img src={image} alt={name} className={styles.wine_image} />
      <div className={styles.card_info}>
        <div className={styles.name_container}>
          <p className={styles.name}>{name}</p>
        </div>
        <p className={styles.wine_origin}>{origin}</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={rating >= star ? styles.star_filled : styles.star_empty}
              size={18}  // 아이콘 크기 설정
            />
          ))}
        </div>
        <div className={styles.rating}>{rating}/5</div>
      </div>
    </div>
  );
};

export default SmallWineCard;
