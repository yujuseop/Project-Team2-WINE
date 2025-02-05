import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import Head from "next/head";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
}

export default function WineDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWine = async () => {
      try {
        // 임시 토큰 지정
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM4NzQ0MzI3LCJleHAiOjE3MzkzNDkxMjcsImlzcyI6InNwLWVwaWdyYW0ifQ.YvbCx08OHOM2WbgydXISFcUeJAWbaq7EX2c2kqZBTlE";
        const response = await instance.get(`/wines/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWine(response.data);
      } catch (error) {
        console.error("와인 정보를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWine();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!wine) return <p>와인 정보를 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "40px 0", backgroundColor: "#FFFFFF" }}>
      <Head>
        <title>WHYNE - 와인 상세 페이지</title>
      </Head>
      <Header />
      <div>
        <h1>{wine.name}</h1>
        <Image
          src={wine.image}
          alt={wine.name}
          width={200}
          height={250}
          layout="intrinsic"
          priority
          style={{ backgroundColor: "none" }}
        />
        <p>지역: {wine.region}</p>
        <p>가격: {wine.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
