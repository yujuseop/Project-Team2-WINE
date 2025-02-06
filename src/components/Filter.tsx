import { useState } from 'react';
import styles from '@/styles/Filter.module.css';

const Filter = ({ onFilter }) => {
  const [type, setType] = useState('');
  const [price, setPrice] = useState(100000);
  const [rating, setRating] = useState(0);

  const applyFilter = () => {
    onFilter({ type, price, rating });
  };

  return (
    <div className={styles.filter}>
      <label>Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Sparkling">Sparkling</option>
        </select>
      </label>

      <label>Max Price:
        <input type="range" min="0" max="200000" value={price} onChange={(e) => setPrice(e.target.value)} />
        <span>₩ {price.toLocaleString()}</span>
      </label>

      <label>Min Rating:
        <input type="number" min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} />
      </label>

      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
