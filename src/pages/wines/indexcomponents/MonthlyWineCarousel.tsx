import React, { useEffect, useState, useRef } from "react";
import axios from "@/libs/axios";
import styles from "./MonthlyWineCarousel.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Wine {
  id: number;
  name: string;
  avgRating: number;
  image: string;
  region: string;
  price: number;
  reviewCount: number;
  type: string;
  recentReview: {
    content: string;
  } | null;
}

const MonthlyWineCarousel: React.FC = () => {
  const [monthlyWines, setMonthlyWines] = useState<Wine[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMonthlyWines = async () => {
      try {
        const response = await axios.get("wines?limit=10");
        setMonthlyWines(response.data.list);
      } catch (error) {
        console.error("이달의 추천 와인 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMonthlyWines();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carousel_wrapper}>
      <h2 className={styles.carousel_title}>이번 달 추천 와인</h2>
      
      <button className={styles.arrow_button_left} onClick={scrollLeft}>
        <FaArrowLeft className={styles.arrow_icon} />
      </button>

      <div ref={carouselRef} className={styles.carousel_container}>
        {monthlyWines.map((wine) => (
          <div key={wine.id} className={styles.carousel_card}>
            <img src={wine.image} alt={wine.name} className={styles.wine_image} />
            <div className={styles.wine_info}>
              <h3 className={styles.wine_rating}>{wine.avgRating.toFixed(1)}</h3>
              <p className={styles.wine_name}>{wine.name}</p>
              <p className={styles.wine_type}>({wine.type})</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.arrow_button_right} onClick={scrollRight}>
        <FaArrowRight className={styles.arrow_icon} />
      </button>
    </div>
  );
};

export default MonthlyWineCarousel;
