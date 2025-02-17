import React, { useState } from "react";
import Image from "next/image";
import styles from "./WineCard.module.css";

interface Wine {
  name: string;
  region: string;
  image?: string; // 선택적 속성으로 변경
  price: number;
}

const WineCard = ({ wine }: { wine?: Wine }) => {
  // 상태를 컴포넌트 외부에서 선언하여 조건문 안에서 호출되지 않도록 합니다.
  const [imgSrc, setImgSrc] = useState(
    wine?.image || "/assets/icon/empty_img.png"
  );

  const handleImageError = () => {
    setImgSrc("/assets/icon/empty_img.png"); // 이미지 로딩 실패 시 기본 이미지로 설정
  };

  // wine이 없다면 fallback을 렌더링
  if (!wine) {
    return <div className={styles.card}>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.card}>
      {/* 와인 이미지 */}
      <div className={styles.card_img}>
        <Image
          src={imgSrc} // 상태에서 이미지 경로 사용
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
