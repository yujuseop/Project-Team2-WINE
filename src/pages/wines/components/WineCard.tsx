import React, { useState } from "react";
import Image from "next/image";
import styles from "./WineCard.module.css";

interface Wine {
  name: string;
  region: string;
  image?: string;
  price: number;
}

const WineCard = ({ wine }: { wine?: Wine }) => {
  const [imgSrc, setImgSrc] = useState(
    wine?.image || "/assets/icon/empty_img.png"
  );

  const handleImageError = () => {
    setImgSrc("/assets/icon/empty_img.png"); // 이미지 로딩 실패 시 기본 이미지로 설정
  };

  if (!wine) {
    return <div className={styles.card}>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.card}>
      {/* 와인 이미지 */}
      <div className={styles.card_img}>
        <Image
          src={imgSrc}
          alt={wine.name}
          fill
          style={{ objectFit: "contain" }}
          priority
          onError={handleImageError} // 이미지 오류 발생 시 처리
        />
      </div>
      {/* 와인 정보 */}
      <div className={styles.card_info}>
        <h1 className={styles.wineName}>{wine.name}</h1>
        <p className={styles.region}>{wine.region}</p>
        <span className={styles.price}>
          ₩ {(wine.price ?? 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default WineCard;
