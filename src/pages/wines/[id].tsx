import { ParsedUrlQuery } from "querystring";
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

interface WineDetailProps {
  wine: Wine | null;
  error: string | null;
}

export default function WineDetailPage({ wine, error }: WineDetailProps) {
  if (error) {
    return <p>{error}</p>;
  }

  if (!wine) {
    return <p>와인 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div style={{ padding: "40px 0", backgroundColor: "#FFFFFF" }}>
      <Head>
        <title>WHYNE - 와인 상세 페이지</title>
      </Head>
      <Header />
      <div>
        <h1>{wine.name}</h1>
        <div style={{ position: "relative", width: "200px", height: "250px" }}>
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            style={{
              objectFit: "contain", // objectFit을 최신 방식으로 처리
              objectPosition: "center", // objectPosition을 style로 설정
            }}
            priority
          />
        </div>
        <p>지역: {wine.region}</p>
        <p>가격: {wine.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps = async (context: { params: Params }) => {
  const { id } = context.params;

  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM4NzQ0MzI3LCJleHAiOjE3MzkzNDkxMjcsImlzcyI6InNwLWVwaWdyYW0ifQ.YvbCx08OHOM2WbgydXISFcUeJAWbaq7EX2c2kqZBTlE";
    const response = await instance.get(`/wines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      return {
        props: {
          wine: null,
          error: "와인 정보를 불러오는데 실패했습니다.",
        },
      };
    }

    return {
      props: {
        wine: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("와인 정보를 불러오는데 실패했습니다.", error);
    return {
      props: {
        wine: null,
        error: "와인 정보를 불러오는데 실패했습니다.",
      },
    };
  }
};
