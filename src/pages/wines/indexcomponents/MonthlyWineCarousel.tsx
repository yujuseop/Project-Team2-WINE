import React, { useEffect, useState, useRef } from "react";
import axios from "@/libs/axios";
import Image from "next/image";
import styles from "./MonthlyWineCarousel.module.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

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
        const shuffledWines = response.data.list.sort(
          () => Math.random() - 0.5
        ); // 배열 셔플
        setMonthlyWines(shuffledWines);
      } catch (error) {
        console.error(
          "이달의 추천 와인 데이터를 불러오는 중 오류 발생:",
          error
        );
      }
    };

    fetchMonthlyWines();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.carousel_wrapper}>
      <h2 className={styles.carousel_title}>이번 달 추천 와인</h2>

      <button className={styles.arrow_button_left} onClick={scrollLeft}>
        <FaArrowLeft className={styles.arrow_icon} />
      </button>

      <div ref={carouselRef} className={styles.carousel_container}>
        {monthlyWines.length > 0 ? (
          monthlyWines.map((wine) => (
            <div key={wine.id} className={styles.carousel_card}>
              <Image
                src={wine.image}
                alt={wine.name}
                className={styles.wine_image}
                width={200}
                height={200}
              />
              <div className={styles.wine_info}>
                <h3 className={styles.wine_rating}>
                  {wine.avgRating.toFixed(1)}
                </h3>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        wine.avgRating >= star
                          ? styles.star_filled
                          : styles.star_empty
                      }
                      size={18}
                    />
                  ))}
                </div>
                <div className={styles.wine_details}>
                  <p className={styles.name}>{wine.name}</p>
                  <p className={styles.wine_type}>({wine.type})</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.no_wines_message}>추천 와인이 없습니다.</p>
        )}
      </div>

      <button className={styles.arrow_button_right} onClick={scrollRight}>
        <FaArrowRight className={styles.arrow_icon} />
      </button>
    </div>
  );
};

export default MonthlyWineCarousel;
