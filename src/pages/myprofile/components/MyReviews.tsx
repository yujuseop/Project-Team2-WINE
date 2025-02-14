import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/libs/axios";
import styles from "./MyWineList.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string | null;
  price: number;
}

const MyWineList: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWines = async () => {
      let accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        console.error("🚨 Access Token이 없음. 로그인 필요.");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        router.push("/login");
        return;
      }

      try {
        console.log("🟢 API 요청 시작");

        const response = await axiosInstance.get("https://winereview-api.vercel.app/12-2/users/me/wines", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 10, // ✅ API에 요청할 데이터 개수 (10개 제한)
          },
        });

        if (!response.data.list || response.data.list.length === 0) {
          setError("등록된 와인이 없습니다.");
          return;
        }

        const transformedWines: Wine[] = response.data.list.map((item: any) => ({
          id: item.id,
          name: item.name || "Unknown Wine",
          region: item.region || "Unknown Region",
          image: item.image || "/default-wine.png",
          price: item.price || 0,
        }));

        setWines(transformedWines);
      } catch (error: any) {
        console.error("🚨 와인 데이터 요청 실패:", error);
        setError("와인 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={styles.container}>
      {wines.length > 0 ? (
        wines.map((wine) => (
          <div
            key={wine.id}
            onClick={() => router.push(`/wine-detail/${wine.id}`)}
            className={`${styles.wineCard} cursor-pointer`}
          >
            <div className={styles.card}>
              <Image
                src={wine.image ?? "/default-wine.png"}
                alt={wine.name}
                width={100}
                height={100}
                className={styles.wineImage}
              />
              <div className={styles.info}>
                <h2 className={styles.wineName}>{wine.name}</h2>
                <p className={styles.wineRegion}>{wine.region}</p>
                <span className={styles.winePrice}>₩ {wine.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">아직 등록한 와인이 없습니다.</p>
      )}
    </div>
  );
};

export default MyWineList;

