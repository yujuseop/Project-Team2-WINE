import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import MyReviews from "./components/MyReviews";
import Header from "@/components/Header";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<"reviews" | "registered">(
    "reviews"
  );

  return (
    <div>
      {/* 헤더 */}
      <Header />

      <div style={{ display: "flex" }}>
        {/* 왼쪽 프로필 메뉴 */}
        <aside>
          <ProfileCard />
        </aside>

        {/* 메인 컨텐츠 */}
        <main style={{ flexGrow: 1 }}>
          {/* 탭 메뉴 */}
          <nav>
            <button
              onClick={() => setActiveTab("reviews")}
              style={{
                fontWeight: activeTab === "reviews" ? "bold" : "normal",
              }}
            >
              내가 쓴 후기
            </button>
            <button
              onClick={() => setActiveTab("registered")}
              style={{
                fontWeight: activeTab === "registered" ? "bold" : "normal",
              }}
            >
              내가 등록한 와인
            </button>
          </nav>

          {/* 선택된 탭에 따라 컴포넌트 변경 */}
          {activeTab === "reviews" ? <MyReviews /> : null}
        </main>
      </div>
    </div>
  );
}
