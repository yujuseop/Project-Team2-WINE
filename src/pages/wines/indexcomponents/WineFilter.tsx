import React, { useState } from "react";
import styles from "./WineFilter.module.css";
import { FaFilter } from "react-icons/fa";

interface WineFilterProps {
  onTypeChange: (type: string) => void;
  onPriceChange: (price: number) => void;
  onRatingChange: (ratings: string[]) => void;
}

const WineFilter: React.FC<WineFilterProps> = ({ onTypeChange, onPriceChange, onRatingChange }) => {
  const [selectedType, setSelectedType] = useState<string>("White");
  const [priceRange, setPriceRange] = useState<number>(74000);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    onTypeChange(type);  // 부모 컴포넌트로 타입 전달
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(event.target.value);
    setPriceRange(price);
    onPriceChange(price);  // 부모 컴포넌트로 가격 전달
  };

  const handleRatingChange = (rating: string) => {
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updatedRatings);
    onRatingChange(updatedRatings);  // 부모 컴포넌트로 별점 전달
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
	{/* 필터 아이콘 */} 
      <div className={styles.filter_icon} onClick={toggleFilterVisibility}>
        <FaFilter size={20} />
      </div>
 	   {/* 필터 패널 */}
      <div className={`${styles.filter_container} ${isFilterVisible ? styles.active : ""}`}>
        <div className={styles.filter_section}>
          <h3 className={styles.filter_title}>WINE TYPES</h3>
          <div className={styles.type_buttons}>
            {['Red', 'White', 'Sparkling'].map((type) => (
              <button
                key={type}
                className={`${styles.type_button} ${selectedType === type ? styles.active : ''}`}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filter_section}>
          <h3 className={styles.filter_title}>PRICE</h3>
          <div className={styles.price_range}>
            <span>₩ 0</span>
            <span>₩ {priceRange.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="74000"
            value={priceRange}
            className={styles.range_slider}
            onChange={handlePriceChange}
          />
        </div>

        <div className={styles.filter_section}>
          <h3 className={styles.filter_title}>RATING</h3>
          <div className={styles.rating_options}>
            {['4.5 - 5.0', '4.0 - 4.5', '3.5 - 4.0'].map((rating) => (
              <label key={rating} className={styles.rating_label}>
                <input
                  type="checkbox"
                  className={styles.rating_checkbox}
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                {rating}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WineFilter;
