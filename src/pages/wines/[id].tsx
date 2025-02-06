import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/wineDetail.module.css';

const WineDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [wine, setWine] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/wines/${id}`)
        .then((res) => res.json())
        .then((data) => setWine(data));
    }
  }, [id]);

  if (!wine) return <p>Loading...</p>;

  return (
    <div className={styles.detail_page}>
      <button onClick={() => router.push('/wines')}>Back</button>
      <h1>{wine.name}</h1>
      <img src={wine.image} alt={wine.name} />
      <p>Region: {wine.region}</p>
      <p>Price: ₩ {wine.price.toLocaleString()}</p>
      <p>Rating: ⭐ {wine.rating}</p>
    </div>
  );
};

export default WineDetail;
