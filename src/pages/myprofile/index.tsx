import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import MyReviews from "./components/MyReviews";
import MyWineList from "./components/MyWineList";
import Header from "@/components/Header";
import styles from "./MyProfile.module.css";
import Head from "next/head";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<"reviews" | "registered">(
    "reviews"
  );

  return (
    <>
      <Head>
        <title>WHYNE - 마이페이지</title>
      </Head>
      <div className={styles.container}>
        {/* 헤더 */}
        <Header />

        <div className={styles.content_wrapper}>
          {/* 왼쪽 프로필 메뉴 */}
          <div>
            <ProfileCard />
          </div>

          {/* 메인 컨텐츠 */}
          <main className={styles.main_content}>
            {/* 탭 메뉴 */}
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
              <p className={styles.total_count}>총 갯수</p>
            </div>

            {/* 선택된 탭에 따라 컴포넌트 변경 */}
            <div>
              {activeTab === "reviews" ? <MyReviews /> : <MyWineList />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
