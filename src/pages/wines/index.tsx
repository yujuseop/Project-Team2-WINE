// WinePage.tsx

import React, { useState } from "react";
import WineFilter from "./indexcomponents/WineFilter";  // 왼쪽 필터 컴포넌트
import WineSearchBar from "./indexcomponents/WineSearchBar";  // 검색 바 컴포넌트
import MonthlyWineCarousel from "./indexcomponents/MonthlyWineCarousel";  // 이달의 추천 와인 캐러셀
import WineRegisterModal from "./indexcomponents/WineRegisterModal";  // 와인 등록 모달
import WineCard from "./indexcomponents/WineCard";  // 메인 페이지 와인 카드
import styles from "./indexcomponents/WinePage.module.css";  // 스타일 파일
import Header from "@/components/Header";

interface Wine {
  id: number;
  name: string;
  rating: number;
  image: string;
  region: string;
  price: number;
  reviews: number;
  latestReview: string;
}

interface WineData {
  wineName: string;
  price: number;
  origin: string;
  type: string;
  rating: number;
}

const WinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [wineList, setWineList] = useState<Wine[]>([
    {
      id: 1,
      name: "Sentinel Cabernet Sauvignon 2016",
      rating: 4.8,
      image: "/assets/images/wines/image 8.png",
      region: "Bordeaux, France",
      price: 64990,
      reviews: 120,
      latestReview: "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.",
    },    
    {
      id: 2,
      name: "Ciel du Cheval Vineyard Collaboration Series II 2012",
      rating: 4.6,
      image: "/assets/images/wines/image 9.png",
      region: "Bordeaux, France",
      price: 64990,
      reviews: 120,
      latestReview: "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.",
    },    
    {
      id: 3,
      name: "Sentinel Cabernet Sauvignon 2016",
      rating: 4.6,
      image: "/assets/images/wines/image 10.png",
      region: "Bordeaux, France",
      price: 64990,
      reviews: 120,
      latestReview: "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.",
    },    
    {
      id: 4,
      name: "Sentinel Cabernet Sauvignon 2016",
      rating: 4.7,
      image: "/assets/images/wines/image 8.png",
      region: "Bordeaux, France",
      price: 64990,
      reviews: 120,
      latestReview: "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.",
    },    
    {
      id: 5,
      name: "Sentinel Cabernet Sauvignon 2016",
      rating: 4.2,
      image: "/assets/images/wines/image 8.png",
      region: "Bordeaux, France",
      price: 64990,
      reviews: 120,
      latestReview: "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.",
    },
  ]);

  const handleAddWine = (wineData: WineData) => {
    const newWine: Wine = {
      id: wineList.length + 1,  // 새로운 와인에 고유 ID 부여
      name: wineData.wineName,
      rating: wineData.rating,
      image: "/assets/images/wines/image 8.png",  // 기본 이미지 지정
      region: wineData.origin,
      price: wineData.price,
      reviews: 0,
      latestReview: "",  // 초기 리뷰 없음
    };

    setWineList([...wineList, newWine]);
    setIsModalOpen(false);
  };

  const handleTypeChange = (type: string) => {
    console.log("Selected type:", type);
  };

  const handlePriceChange = (price: number) => {
    console.log("Selected price:", price);
  };

  const handleRatingChange = (ratings: string[]) => {
    console.log("Selected ratings:", ratings);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div>
      <Header/>
      <div className={styles.page_container}>
        <aside className={styles.filter_section}>
          <WineFilter 
            onTypeChange={handleTypeChange} 
            onPriceChange={handlePriceChange} 
            onRatingChange={handleRatingChange} 
          />
          <button
            className={styles.register_button}
            onClick={() => setIsModalOpen(true)}
          >
            와인 등록하기
          </button>
        </aside>

        <main className={styles.main_content}>
          <MonthlyWineCarousel />
          <WineSearchBar onSearch={handleSearch} />
          <div className={styles.wine_list_container}>
            {wineList.map((wine: Wine) => (
              <WineCard
                key={wine.id}
                id={wine.id}
                name={wine.name}
                rating={wine.rating}
                image={wine.image}
                region={wine.region}
                price={wine.price}
                reviews={wine.reviews}
                latestReview={wine.latestReview}
              />
            ))}
          </div>
        </main>

        {isModalOpen && (
          <WineRegisterModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddWine}
          />
        )}
      </div>
    </div>
  );
};

export default WinePage;
