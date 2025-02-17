import React, { useState, ReactNode } from "react";
import styles from "./WineFilter.module.css";

interface WineFilterProps {
  onApplyFilters?: (
    filters: {
      type: string;
      minPrice: number;
      maxPrice: number;
      ratings: string[];
    } | null
  ) => void;
  isFilterOpen: boolean;
  children?: ReactNode; // ✅ children 속성 추가하여 부모 컴포넌트에서 전달된 JSX를 렌더링할 수 있도록 함
}

const WineFilter: React.FC<WineFilterProps> = ({
  onApplyFilters,
  isFilterOpen,
  children,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const handleTypeClick = (type: string) => {
    setSelectedType((prevType) => (prevType === type ? null : type));
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
      // 필터가 모두 기본값일 경우 null을 넘겨서 필터를 제거
      const filters = {
        type: selectedType || "",
        minPrice,
        maxPrice,
        ratings: selectedRatings,
      };

      // 모든 값이 기본값일 경우 null을 전달
      if (
        !filters.type &&
        filters.minPrice === 0 &&
        filters.maxPrice === 5000000 &&
        filters.ratings.length === 0
      ) {
        onApplyFilters(null);
      } else {
        onApplyFilters(filters);
      }
    }
  };

  return (
    <div
      className={`${styles.filter_container} ${
        isFilterOpen ? styles.active : ""
      }`}
    >
      <h3 className={styles.filter_title}>WINE TYPES</h3>
      <div className={styles.wine_type_buttons}>
        {["Red", "White", "Sparkling"].map((type) => (
          <button
            key={type}
            className={`${styles.wine_type_button} ${
              selectedType === type ? styles.active : ""
            }`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <h3 className={styles.filter_title}>PRICE</h3>
      <div className={styles.price_range}>
        <span>₩ {minPrice ? minPrice.toLocaleString() : "0"}</span>
        <span>₩ {maxPrice ? maxPrice.toLocaleString() : "5000000"}</span>
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
        {["4.5 - 5.0", "4.0 - 4.5", "3.5 - 4.0", "3.0 - 3.5", "0.0 - 3.0"].map(
          (rating) => (
            <label key={rating} className={styles.rating_label}>
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              {rating}
            </label>
          )
        )}
        <button className={styles.filter_button} onClick={handleApplyFilters}>
          검색 결과 보기
        </button>
        {/* ✅ children 속성으로 전달된 요소를 이 위치에서 렌더링 */}
        {children}
      </div>
    </div>
  );
};

export default WineFilter;
