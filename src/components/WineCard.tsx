import styles from '@/styles/WineCard.module.css';

const WineCard = ({ wine }) => {
  return (
    <div className={styles.card}>
      <img src={wine.image} alt={wine.name} className={styles.image} />
      <div className={styles.info}>
        <h3>{wine.name}</h3>
        <p>{wine.region}</p>
        <p className={styles.price}>₩ {wine.price.toLocaleString()}</p>
        <p className={styles.rating}>⭐ {wine.rating}</p>
      </div>
    </div>
  );
};

export default WineCard;
