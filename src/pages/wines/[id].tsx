import { ParsedUrlQuery } from "querystring";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import Head from "next/head";
import WineCard from "./components/WineCard";
import styled from "styled-components";

const Container = styled.div`
  background-color: var(--white);
  min-height: 100vh;
  padding: 40px 20px;

  @media (max-width: 1199px) {
    padding: 30px 20px;
  }

  @media (max-width: 767px) {
    padding: 20px 16px;
  }
`;

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

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps = async (context: { params: Params }) => {
  const { id } = context.params;

  try {
    // 임시로 토큰 지정
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM4ODMwMjkyLCJleHAiOjE3Mzk0MzUwOTIsImlzcyI6InNwLWVwaWdyYW0ifQ.st8YukuQRBMncrrqJQMSLm5sJOWHB3E3gcApssNdCS4";
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

export default function WineDetailPage({ wine, error }: WineDetailProps) {
  if (error) {
    return <p>{error}</p>;
  }

  if (!wine) {
    return <p>와인 정보를 찾을 수 없습니다.</p>;
  }

  // wine.image가 없을 경우 기본 이미지 경로를 설정
  const imageSrc = wine.image || "/assets/icon/empty_img.png";

  return (
    <>
      <Head>
        <title>WHYNE - 와인 상세 페이지</title>
      </Head>
      <Container>
        <Header />
        <WineCard wine={{ ...wine, image: imageSrc }} />
      </Container>
    </>
  );
}
