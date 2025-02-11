import React from "react";
import Image from "next/image";
import styles from "./SmallWineCard.module.css";
import { FaStar } from "react-icons/fa";

interface SmallWineCardProps {
  name: string;
  rating: number;
  image: string;
}

const SmallWineCard: React.FC<SmallWineCardProps> = ({ name, rating, image }) => {
  return (
    <div className={styles.wine_card} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '28px', position: 'relative', left: '12.93%', right: '12.93%', top: '12.97%', bottom: '0%' }}>
      <div style={{ position: 'relative', width: '44px', height: '161px' }}>
        <Image 
          src={image} 
          alt={name} 
          className={styles.wine_image}
          layout="fill"
          objectFit="cover"
          style={{ position: 'absolute', left: '0%', right: '0%', top: '0%', bottom: '-9.85%' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px', width: '100px', height: '125px' }}>
        <div style={{ width: '57px', height: '43px', fontFamily: 'Pretendard', fontStyle: 'normal', fontWeight: 800, fontSize: '36px', lineHeight: '43px', color: '#2D3034' }}>{rating.toFixed(1)}</div>
        <div style={{ position: 'relative', width: '90px', height: '18px' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar 
              key={i} 
              style={{ 
                position: 'absolute', 
                width: '18px', 
                height: '18px', 
                left: `${i * 18}px`, 
                top: '0px', 
                color: i < Math.floor(rating) ? '#6A42DB' : '#CFDBEA' 
              }} 
            />
          ))}
        </div>
        <div style={{ width: '100px', height: '54px', fontFamily: 'Pretendard', fontStyle: 'normal', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#9FACBD' }}>{name}</div>
      </div>
    </div>
  );
};

export default SmallWineCard;
