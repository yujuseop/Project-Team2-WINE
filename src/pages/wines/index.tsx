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
import Head from "next/head";

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

  // 초기 데이터 로드 (limit=10)
  const fetchInitialWines = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "10");
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

  // 전체 데이터 로드 (limit=1000) 및 클라이언트 필터링
  const fetchAllWines = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "1000");
      const url = `/wines?${params.toString()}`;
      console.log("Fetch All API URL:", url);
      const response = await axios.get(url);
      const newWines: Wine[] = response.data.list || [];
      setAllWines(newWines);
      setNextCursor(response.data.nextCursor);

      let filtered = newWines;
      if (filters.type) {
        filtered = filtered.filter(
          (wine) => wine.type.toLowerCase() === filters.type.toLowerCase()
        );
      }
      filtered = filtered.filter(
        (wine) =>
          wine.price >= filters.minPrice && wine.price <= filters.maxPrice
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

  // 수정된 handleWineRegister: Optimistic update 후, 서버에 필요한 데이터 형식으로 요청
  const handleWineRegister = (wineData: WineData) => {
    const newWine: Wine = {
      id: Date.now(), // 클라이언트용 임시 id
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
    // 등록 버튼 클릭하자마자 화면에 바로 추가 (optimistic update)
    setAllWines((prev) => [newWine, ...prev]);
    setWineList((prev) => [newWine, ...prev]);
    setIsModalOpen(false);

    // 백엔드가 요구하는 데이터 형식: id, avgRating 등은 제외
    const payload = {
      name: wineData.name,
      region: wineData.region,
      image: wineData.image,
      price: wineData.price,
      type: wineData.type,
    };

    axios
      .post("/wines", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        fetchAllWines();
      })
      .catch((error) => {
        console.error("와인 등록 중 오류 발생:", error);
        alert("와인 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        // 필요 시, optimistic update를 롤백하는 로직을 추가할 수 있습니다.
      });
  };

  return (
    <>
      <Head>
        <title>WHYNE - 와인 목록</title>
      </Head>
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
              <aside
                className={`${styles.filter_section} ${
                  isFilterOpen ? styles.active : ""
                }`}
              >
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
        <div style={{ display: "none" }}>{allWines.length}</div>
      </div>
    </>
  );
};

export default WinePage;
