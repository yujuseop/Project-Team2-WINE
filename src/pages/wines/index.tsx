import React, { useState, useEffect } from "react";
import axios from "@/libs/axios";
import { AxiosError } from "axios";  // AxiosError를 axios 패키지에서 가져오기
import WineFilter from "./indexcomponents/WineFilter";
import WineSearchBar from "./indexcomponents/WineSearchBar";
import MonthlyWineCarousel from "./indexcomponents/MonthlyWineCarousel";
import WineRegisterModal from "./indexcomponents/WineRegisterModal";
import WineCard from "./indexcomponents/WineCard";
import styles from "./indexcomponents/WinePage.module.css";
import Header from "@/components/Header";

// Wine 인터페이스 정의
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

// 필터 기준 인터페이스 정의
interface FilterCriteria {
  type: string;
  minPrice: number;
  maxPrice: number;
  ratings: string[];
}

// Wine 등록 데이터 타입 정의
interface WineData {
  wineName: string;
  price: number;
  origin: string;
  type: string;
  rating: number;
}

const WinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await axios.get("wines?limit=10");
        setWineList(response.data.list);
        setFilteredWines(response.data.list);
      } catch (error) {
        console.error("와인 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchWines();
  }, []);

  const applyFilters = ({ type, minPrice, maxPrice, ratings }: FilterCriteria) => {
    const filtered = wineList.filter((wine: Wine) => {
      const matchesType = wine.type.toLowerCase() === type.toLowerCase();
      const matchesPrice = wine.price >= minPrice && wine.price <= maxPrice;
      const matchesRating = ratings.length === 0 || ratings.some((range: string) => {
        const [minRating, maxRating] = range.split(' - ').map(Number);
        return wine.avgRating >= minRating && wine.avgRating <= maxRating;
      });
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
        image: "https://via.placeholder.com/150",
      };
  
      console.log("전송할 데이터:", requestData);
  
      const response = await axios.post("wines", requestData);
  
      const newWine: Wine = {
        id: response.data.id,
        name: newWineData.wineName,
        region: newWineData.origin,
        image: requestData.image,
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
      const axiosError = error as AxiosError;
      console.error("와인 등록 중 오류 발생:", axiosError.response?.data || axiosError.message);
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
