import React, { useState } from 'react';
import styles from './WineFilter.module.css';

interface WineFilterProps {
  onApplyFilters?: (filters: {
    type: string;
    minPrice: number;
    maxPrice: number;
    ratings: string[];
  }) => void;
}

const WineFilter: React.FC<WineFilterProps> = ({ onApplyFilters }) => {
  const [selectedType, setSelectedType] = useState<string>('White');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(event.target.value) / 100000) * 100000;
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(event.target.value) / 100000) * 100000;
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...prevRatings, rating]
    );
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        type: selectedType,
        minPrice,
        maxPrice,
        ratings: selectedRatings,
      });
    }
  };
  

  return (
    <div className={styles.filter_container}>
      <h3 className={styles.filter_title}>WINE TYPES</h3>
      <div className={styles.wine_type_buttons}>
        {['Red', 'White', 'Sparkling'].map((type) => (
          <button
            key={type}
            className={`${styles.wine_type_button} ${selectedType === type ? styles.active : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <h3 className={styles.filter_title}>PRICE</h3>
      <div className={styles.price_range}>
        <span>₩ {minPrice.toLocaleString()}</span>
        <span>₩ {maxPrice.toLocaleString()}</span>
      </div>

      <div className={styles.range_slider_container}>
        <input
          type="range"
          min="0"
          max="5000000"
          step="100000"
          value={minPrice}
          onChange={handleMinPriceChange}
          className={styles.range_slider}
        />
        <input
          type="range"
          min="0"
          max="5000000"
          step="100000"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className={styles.range_slider}
        />
      </div>

      <h3 className={styles.filter_title}>RATING</h3>
      <div className={styles.rating_options}>
        {['4.5 - 5.0', '4.0 - 4.5', '3.5 - 4.0', '3.0 - 3.5', '0.0 - 3.0'].map((rating) => (
          <label key={rating} className={styles.rating_label}>
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingChange(rating)}
            />
            {rating}
          </label>
        ))}
      </div>

      <button className={styles.filter_button} onClick={handleApplyFilters}>
        검색 결과 보기
      </button>
    </div>
  );
};

export default WineFilter;
