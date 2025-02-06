import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/wines.module.css';
import WineCard from '@/components/WineCard';
import Filter from '@/components/Filter';

const WinesPage = () => {
  const router = useRouter();
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);

  useEffect(() => {
    fetch('/api/wines')
      .then((res) => res.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
      });
  }, []);

  return (
    <div className={styles.wines_page}>
      <header className={styles.header}>
        <h1>Wine List</h1>
      </header>
      <Filter onFilter={(filters) => {
        let result = wines;
        if (filters.type) result = result.filter(w => w.type === filters.type);
        if (filters.price) result = result.filter(w => w.price <= filters.price);
        if (filters.rating) result = result.filter(w => w.rating >= filters.rating);
        setFilteredWines(result);
      }} />
      <section className={styles.wine_list}>
        {filteredWines.map((wine) => (
          <WineCard key={wine.id} wine={wine} onClick={() => router.push('/wines/' + wine.id)} />
        ))}
      </section>
    </div>
  );
};

export default WinesPage;
