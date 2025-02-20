import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import MyReviews from "./components/MyReviews";
import MyWineList from "./components/MyWineList";
import Header from "@/components/Header";
import styles from "./MyProfile.module.css";
import Head from "next/head";
import axios from "@/libs/axios";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<"reviews" | "registered">(
    "reviews"
  );
  const [reviewCount, setReviewCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [reviewRes, wineRes] = await Promise.all([
          axios.get("/users/me/reviews", { params: { limit: 1 } }),
          axios.get("/users/me/wines", { params: { limit: 1 } }),
        ]);

        setReviewCount(reviewRes.data.totalCount);
        setWineCount(wineRes.data.totalCount);
      } catch (error) {
        console.error("총 개수 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <Head>
        <title>WHYNE - 마이페이지</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <div className={styles.content_wrapper}>
          <div>
            <ProfileCard />
          </div>

          <main className={styles.main_content}>
            <div className={styles.tab_header}>
              <nav className={styles.tab_nav}>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`${styles.tabButton} ${
                    activeTab === "reviews" ? styles.active : ""
                  }`}
                >
                  내가 쓴 후기
                </button>
                <button
                  onClick={() => setActiveTab("registered")}
                  className={`${styles.tabButton} ${
                    activeTab === "registered" ? styles.active : ""
                  }`}
                >
                  내가 등록한 와인
                </button>
              </nav>
              {/* 총 갯수 표시 */}
              <p className={styles.total_count}>
                총 {activeTab === "reviews" ? reviewCount : wineCount}개
              </p>
            </div>

            <div>
              {activeTab === "reviews" ? <MyReviews /> : <MyWineList />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
