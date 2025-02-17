import Image from "next/image";
import styles from "./WineCard.module.css";

interface Wine {
  name: string;
  region: string;
  image?: string; // 선택적 속성으로 변경
  price: number;
}

const WineCard = ({ wine }: { wine?: Wine }) => {
  if (!wine) {
    return <div className={styles.card}>데이터를 불러올 수 없습니다.</div>;
  }

  const imageUrl = wine.image || "/assets/icon/empty_img.png";

  return (
    <div className={styles.card}>
      {/* 와인 이미지 */}
      <div className={styles.card_img}>
        <Image
          src={imageUrl}
          alt={wine.name}
          fill
          style={{ objectFit: "contain" }}
          priority
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
