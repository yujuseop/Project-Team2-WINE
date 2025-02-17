import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
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
      <Image 
        src={image} 
        alt={name} 
        className={styles.wine_image} 
        width={150}
        height={150} 
        quality={100}
        layout="intrinsic"
        objectFit="cover" 
      />
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
              size={18}
            />
          ))}
        </div>
        <div className={styles.rating}>{rating}/5</div>
      </div>
    </div>
  );
};

export default SmallWineCard;
