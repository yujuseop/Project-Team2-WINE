import Image from "next/image";
import styles from "./WineCard.module.css";

interface Wine {
  name: string;
  region: string;
  image: string;
  price: number;
}

const WineCard = ({ wine }: { wine: Wine }) => {
  return (
    <div className={styles.card}>
      {/* 와인 이미지 */}
      <div className={styles.card_img}>
        <Image
          src={wine.image}
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
        <span className={styles.price}>₩ {wine.price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default WineCard;
