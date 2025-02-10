import React, { useState, useEffect } from "react";
import styles from "./MonthlyWineCarousel.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SmallWineCard from "./SmallWineCard";

interface Wine {
  id: number;
  name: string;
  rating: number;
  image: string;
}

const wines: Wine[] = [
  {
    id: 1,
    name: "Sentinel Cabernet Sauvignon 2016",
    rating: 4.8,
    image: "/assets/images/wines/image 8.png",
  },
  {
    id: 2,
    name: "Sentinel Cabernet Sauvignon 2016",
    rating: 4.3,
    image: "/assets/images/wines/image 10.png",
  },
  {
    id: 3,
    name: "Ciel du Cheval Vineyard Collaboration Series II 2012",
    rating: 4.6,
    image: "/assets/images/wines/image 9.png",
  },
  {
    id: 4,
    name: "Palazzo della Torre 2017",
    rating: 4.2,
    image: "/assets/images/wines/image 20.png",
  },
  {
    id: 5,
    name: "Sentinel Cabernet Sauvignon 2016",
    rating: 4.7,
    image: "/assets/images/wines/image 9.png",
  },
];

const MonthlyWineCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledWines, setShuffledWines] = useState<Wine[]>([]);

  // 와인 리스트 랜덤 섞기
  useEffect(() => {
    const shuffled = [...wines].sort(() => 0.5 - Math.random());
    setShuffledWines(shuffled);
  }, []);

  const nextSlide = () => {
    if (currentIndex < shuffledWines.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.carousel_container}>
      <h2 className={styles.title}>이번 달 추천 와인</h2>
      <div className={styles.carousel_wrapper}>
        <button onClick={prevSlide} className={styles.arrow_button} disabled={currentIndex === 0}>
          <FaArrowLeft />
        </button>

        <div className={styles.carousel}>
          {shuffledWines.slice(currentIndex, currentIndex + 4).map((wine) => (
            <SmallWineCard key={wine.id} name={wine.name} rating={wine.rating} image={wine.image} />
          ))}
        </div>

        <button onClick={nextSlide} className={styles.arrow_button} disabled={currentIndex >= shuffledWines.length - 4}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MonthlyWineCarousel;
