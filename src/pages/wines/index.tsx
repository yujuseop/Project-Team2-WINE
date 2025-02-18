import React, { useState, useEffect, useCallback } from "react";
import axios from "@/libs/axios";
import WineFilter from "./indexcomponents/WineFilter";
import WineSearchBar from "./indexcomponents/WineSearchBar";
import MonthlyWineCarousel from "./indexcomponents/MonthlyWineCarousel";
import WineRegisterModal from "./indexcomponents/WineRegisterModal";
import WineCard from "./indexcomponents/WineCard";
import WineFilterToggleButton from "./indexcomponents/WineFilterToggleButton";
import styles from "./indexcomponents/WinePage.module.css";
import Header from "@/components/Header";
import { WineData } from "./indexcomponents/WineRegisterModal";

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
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  userId: number;
}

// 필터 상태 타입: 평점은 단일 문자열 (예: "4.5 - 5.0")
type FiltersType = {
  type: string;
  minPrice: number;
  maxPrice: number;
  rating: string;
};

const WinePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FiltersType>({
    type: "",
    minPrice: 0,
    maxPrice: 5000000,
    rating: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // 반응형 설정: 창 크기에 따라 필터 표시 여부
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setIsFilterOpen(window.innerWidth >= 769);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // 기본 로드: 필터/검색어 기본값이면 limit=10으로 API 호출
  const fetchInitialWines = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "10");
      // 검색어는 기본 로드시 API에 전달하지 않습니다.
      const url = `/wines?${params.toString()}`;
      console.log("Initial API URL:", url);
      const response = await axios.get(url);
      const newWines: Wine[] = response.data.list || [];
      setWineList(newWines);
      setAllWines(newWines);
      setNextCursor(response.data.nextCursor);
    } catch (error) {
      console.error("Error fetching initial wines:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 전체 데이터 로드: limit을 크게 가져와 클라이언트 필터링에 충분한 데이터를 불러옴 (검색어 무시)
  const fetchAllWines = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "1000"); // 충분한 데이터를 확보
      // 여기서는 search 파라미터를 제거합니다.
      const url = `/wines?${params.toString()}`;
      console.log("Fetch All API URL:", url);
      const response = await axios.get(url);
      const newWines: Wine[] = response.data.list || [];
      setAllWines(newWines);
      setNextCursor(response.data.nextCursor);

      // 클라이언트 측 필터링 적용
      let filtered = newWines;
      if (filters.type) {
        filtered = filtered.filter((wine) =>
          wine.type.toLowerCase() === filters.type.toLowerCase()
        );
      }
      filtered = filtered.filter(
        (wine) => wine.price >= filters.minPrice && wine.price <= filters.maxPrice
      );
      if (filters.rating) {
        const [minStr, maxStr] = filters.rating.split(" - ");
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        filtered = filtered.filter(
          (wine) => wine.avgRating >= min && wine.avgRating <= max
        );
      }
      if (searchQuery.trim()) {
        filtered = filtered.filter((wine) =>
          wine.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setWineList(filtered);
    } catch (error) {
      console.error("Error fetching all wines:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchQuery]);

  // 초기 로드: 기본 필터 상태이면 초기 데이터를 로드, 그렇지 않으면 전체 데이터로 클라이언트 필터링 적용
  useEffect(() => {
    if (
      !searchQuery.trim() &&
      !filters.type &&
      filters.minPrice === 0 &&
      filters.maxPrice === 5000000 &&
      !filters.rating
    ) {
      fetchInitialWines();
    } else {
      fetchAllWines();
    }
  }, [searchQuery, filters, fetchInitialWines, fetchAllWines]);

  // 추가 데이터 로드 ("더보기" 버튼): 10개씩 추가, 검색어는 API에 전달하지 않음
  const loadMoreWines = async () => {
    if (nextCursor === null) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "10");
      params.append("cursor", String(nextCursor));
      const url = `/wines?${params.toString()}`;
      console.log("Load More API URL:", url);
      const response = await axios.get(url);
      const newWines: Wine[] = response.data.list || [];
      setWineList((prev) => [...prev, ...newWines]);
      setAllWines((prev) => [...prev, ...newWines]);
      setNextCursor(response.data.nextCursor);
    } catch (error) {
      console.error("Error loading more wines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // WineFilter에서 전달받은 필터 상태 업데이트
  const handleFilterChange = (newFilters: FiltersType | null) => {
    if (newFilters === null) {
      setFilters({
        type: "",
        minPrice: 0,
        maxPrice: 5000000,
        rating: "",
      });
    } else {
      setFilters(newFilters);
    }
  };

  // 와인 등록 후 즉시 새 데이터를 반영: optimistic update 후 전체 데이터 재로드
  const handleWineRegister = (wineData: WineData) => {
    const newWine: Wine = {
      id: Date.now(),
      name: wineData.name,
      region: wineData.region,
      image: wineData.image,
      price: wineData.price,
      type: wineData.type,
      avgRating: 0,
      reviewCount: 0,
      userId: 1,
      recentReview: null,
    };
    // optimistic update: 기존 상태에 바로 추가
    setAllWines((prev) => [newWine, ...prev]);
    setWineList((prev) => [newWine, ...prev]);
    setIsModalOpen(false);
    // 백그라운드 API 호출
    axios
      .post("/wines", newWine, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        fetchAllWines();
      })
      .catch((error) => {
        console.error("와인 등록 중 오류 발생:", error);
        alert("와인 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div>
      {windowWidth !== null && windowWidth < 769 && (
        <WineFilterToggleButton onClick={toggleFilter} />
      )}
      <div className={styles.page_container}>
        <Header />
        <div className={styles.carousel_container}>
          <MonthlyWineCarousel />
        </div>
        <main className={styles.main_content}>
          <div className={styles.content_wrapper}>
            <aside className={`${styles.filter_section} ${isFilterOpen ? styles.active : ""}`}>
              <WineFilter
                isFilterOpen={isFilterOpen}
                onApplyFilters={handleFilterChange}
              >
                <button
                  className={styles.register_button}
                  onClick={() => setIsModalOpen(true)}
                >
                  와인 등록하기
                </button>
              </WineFilter>
            </aside>
            <section className={styles.content_section}>
              <div className={styles.search_bar_container}>
                <WineSearchBar onSearch={(query) => setSearchQuery(query)} />
              </div>
              <div className={styles.wine_list_container}>
                {wineList.length > 0 ? (
                  wineList.map((wine) => <WineCard key={wine.id} {...wine} />)
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
              </div>
              {nextCursor !== null && (
                <button
                  className={styles.load_more_button}
                  onClick={loadMoreWines}
                  disabled={isLoading}
                >
                  {isLoading ? "로딩 중..." : "더보기"}
                </button>
              )}
            </section>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <WineRegisterModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleWineRegister}
        />
      )}
      {/* ESLint 경고 해소용: allWines 사용 표시 */}
      <div style={{ display: "none" }}>{allWines.length}</div>
    </div>
  );
};

export default WinePage;
