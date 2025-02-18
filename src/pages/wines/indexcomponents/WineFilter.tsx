import React, { useState, ReactNode } from "react";
import styles from "./WineFilter.module.css";

interface WineFilterProps {
  onApplyFilters: (filters: {
    type: string;
    minPrice: number;
    maxPrice: number;
    rating: string;
  } | null) => void;
  isFilterOpen: boolean;
  children?: ReactNode;
}

const WineFilter: React.FC<WineFilterProps> = ({ onApplyFilters, isFilterOpen, children }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  // 단일 평점 필터 선택 (라디오 버튼 방식)
  const [selectedRating, setSelectedRating] = useState<string>("");

  const handleTypeClick = (type: string) => {
    setSelectedType((prev) => (prev === type ? "" : type));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value) / 100000) * 100000;
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value) / 100000) * 100000;
    if (value >= minPrice) setMaxPrice(value);
  };

  // 라디오 버튼 방식으로 평점 하나만 선택 (전체 선택 시 빈 문자열)
  const handleRatingChange = (ratingValue: string) => {
    setSelectedRating((prev) => (prev === ratingValue ? "" : ratingValue));
  };

  const handleApplyFilters = () => {
    if (!onApplyFilters) return;
    // 모든 필터가 기본값이면 null로 전달하여 필터를 해제
    if (!selectedType && minPrice === 0 && maxPrice === 5000000 && !selectedRating) {
      onApplyFilters(null);
    } else {
      onApplyFilters({
        type: selectedType,
        minPrice,
        maxPrice,
        rating: selectedRating, // 예: "4.5 - 5.0"
      });
    }
  };

  return (
    <div className={`${styles.filter_container} ${isFilterOpen ? styles.active : ""}`}>
      <h3 className={styles.filter_title}>WINE TYPES</h3>
      <div className={styles.wine_type_buttons}>
        {["Red", "White", "Sparkling"].map((type) => (
          <button
            key={type}
            className={`${styles.wine_type_button} ${selectedType === type ? styles.active : ""}`}
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
      <div className={styles.rating_radio_group}>
        <label className={styles.radio_label}>
          <input
            type="radio"
            name="rating"
            value=""
            checked={selectedRating === ""}
            onChange={() => handleRatingChange("")}
          />
          전체
        </label>
        {["4.5 - 5.0", "4.0 - 4.5", "3.5 - 4.0", "3.0 - 3.5"].map((range) => (
          <label key={range} className={styles.radio_label}>
            <input
              type="radio"
              name="rating"
              value={range}
              checked={selectedRating === range}
              onChange={() => handleRatingChange(range)}
            />
            {range}
          </label>
        ))}
      </div>

      <button className={styles.filter_button} onClick={handleApplyFilters}>
        검색 결과 보기
      </button>

      {children}
    </div>
  );
};

export default WineFilter;
