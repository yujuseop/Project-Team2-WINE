import React, { useState, useEffect, useCallback } from "react";
import axios from "@/libs/axios";
import WineFilter from "./indexcomponents/WineFilter";
import WineSearchBar from "./indexcomponents/WineSearchBar";
import MonthlyWineCarousel from "./indexcomponents/MonthlyWineCarousel";
import WineRegisterModal from "./indexcomponents/WineRegisterModal";
import WineCard from "./indexcomponents/WineCard";
import styles from "./indexcomponents/WinePage.module.css";
import Header from "@/components/Header";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    content: string;
  } | null;
}

interface FilterCriteria {
  type: string;
  minPrice: number;
  maxPrice: number;
  ratings: string[];
}

interface WineData {
  wineName: string;
  price: number;
  origin: string;
  type: string;
  rating: number;
  image: string;
}

const WinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWines = useCallback(async () => {
    if (isLoading) return; // ✅ 로딩 중이면 실행 방지
    setIsLoading(true);
  
    const url = nextCursor
      ? `wines?limit=10&cursor=${nextCursor}`
      : `wines?limit=10`;
  
    try {
      const response = await axios.get(url);
      const newWines = response.data.list;
  
      // ✅ 중복 제거
      setWineList((prev) => {
        const mergedWines = [...prev, ...newWines];
        return Array.from(new Set(mergedWines.map((wine) => JSON.stringify(wine)))).map((wineStr) => JSON.parse(wineStr));
      });
  
      setFilteredWines((prev) => {
        const mergedWines = [...prev, ...newWines];
        return Array.from(new Set(mergedWines.map((wine) => JSON.stringify(wine)))).map((wineStr) => JSON.parse(wineStr));
      });
  
      setNextCursor(response.data.nextCursor);
    } catch (error) {
      console.error("와인 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, nextCursor]);
  
  // ✅ useEffect가 불필요한 실행을 하지 않도록 조건 추가
  useEffect(() => {
    if (!nextCursor) {
      fetchWines();
    }
  }, [fetchWines, nextCursor]);
  
  const applyFilters = (param: FilterCriteria | null) => {
    if (!param) {
      setFilteredWines(wineList);
      return;
    }

    const { type, minPrice, maxPrice, ratings } = param;

    const filtered = wineList.filter((wine: Wine) => {
      const matchesType = type ? wine.type.toLowerCase() === type.toLowerCase() : true;
      const matchesPrice = wine.price >= minPrice && wine.price <= maxPrice;
      const matchesRating = ratings.length > 0 
        ? ratings.some((range) => {
            const [min, max] = range.split(' - ').map(Number);
            return wine.avgRating >= min && wine.avgRating <= max;
          }) 
        : true;

      return matchesType && matchesPrice && matchesRating;
    });

    setFilteredWines(filtered);
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredWines(wineList);
    } else {
      const results = wineList.filter((wine: Wine) => 
        wine.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredWines(results);
    }
  };

  const handleRegisterWine = async (newWineData: WineData) => {
    try {
      const requestData = {
        name: newWineData.wineName,
        price: Number(newWineData.price),
        region: newWineData.origin,
        type: newWineData.type.toUpperCase(),
        image: newWineData.image,
      };

      const response = await axios.post("wines", requestData);

      const newWine: Wine = {
        id: response.data.id,
        name: newWineData.wineName,
        region: newWineData.origin,
        image: newWineData.image,
        price: requestData.price,
        type: requestData.type,
        avgRating: newWineData.rating,
        reviewCount: 0,
        recentReview: null,
      };

      setWineList([...wineList, newWine]);
      setFilteredWines([...wineList, newWine]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("와인 등록 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.page_container}>
        <div className={styles.carousel_container}>
          <MonthlyWineCarousel />
        </div>

        <main className={styles.main_content}>
          <div className={styles.content_wrapper}>
            <aside className={styles.filter_section}>
              <WineFilter onApplyFilters={applyFilters} />
              <button className={styles.register_button} onClick={() => setIsModalOpen(true)}>
                와인 등록하기
              </button>
            </aside>

            <section className={styles.content_section}>
              <div className={styles.search_bar_container}>
                <WineSearchBar onSearch={handleSearch} />
              </div>

              <div className={styles.wine_list_container}>
                {filteredWines.length > 0 ? (
                  filteredWines.map((wine: Wine) => (
                    <WineCard key={wine.id} {...wine} />
                  ))
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
              </div>

              {nextCursor && (
                <button className={styles.load_more_button} onClick={fetchWines} disabled={isLoading}>
                  {isLoading ? "로딩 중..." : "더보기"}
                </button>
              )}
            </section>
          </div>
        </main>

        {isModalOpen && (
          <WineRegisterModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleRegisterWine}
          />
        )}
      </div>
    </div>
  );
};

export default WinePage;
