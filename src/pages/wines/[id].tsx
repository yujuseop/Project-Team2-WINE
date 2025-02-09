import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import WineCard from "./components/WineCard";
import ReviewCardList from "./components/ReviewCardList";
import RatingSummary from "./components/RatingSummary";
import styled from "styled-components";
import { parseCookies } from "nookies"; // SSR에서 쿠키 파싱

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

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  min-width: 280px;

  @media (max-width: 767px) {
    order: 1;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: bold;
`;

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
}

interface User {
  nickname: string | null;
  image: string | null;
}

interface Review {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: User;
  isLiked: boolean;
}

interface WineDetailProps {
  wine: Wine | null;
  reviews: Review[];
  error: string | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface ReviewApiResponse {
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  id: number;
  isLiked: boolean;
  user?: {
    nickname: string;
    image: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const cookies = parseCookies(context); // 쿠키에서 accessToken 가져오기
  const token = cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await instance.get(`/wines/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      return {
        props: {
          wine: null,
          error: "와인 정보를 불러오는데 실패했습니다.",
          reviews: [],
        },
      };
    }

    const reviews: Review[] = response.data.reviews.map(
      (review: ReviewApiResponse) => ({
        id: review.id,
        rating: review.rating,
        aroma: review.aroma,
        content: review.content,
        createdAt: review.createdAt,
        lightBold: review.lightBold,
        smoothTannic: review.smoothTannic,
        drySweet: review.drySweet,
        softAcidic: review.softAcidic,
        user: review.user
          ? {
              nickname: review.user.nickname ?? "Anonymous",
              image: review.user.image ?? "/assets/icon/user_empty_img.svg",
            }
          : {
              nickname: "Anonymous",
              image: "/assets/icon/user_empty_img.svg",
            },
        isLiked: review.isLiked,
      })
    );

    return {
      props: { wine: response.data, error: null, reviews },
    };
  } catch (error) {
    console.error("와인 정보를 불러오는데 실패했습니다.", error);
    return {
      props: {
        wine: null,
        error: "와인 정보를 불러오는데 실패했습니다.",
        reviews: [],
      },
    };
  }
};

export default function WineDetailPage({
  wine,
  reviews,
  error,
}: WineDetailProps) {
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!wine) return <ErrorMessage>와인 정보를 찾을 수 없습니다.</ErrorMessage>;

  return (
    <>
      <Head>
        <title>WHYNE - 와인 상세 페이지</title>
      </Head>
      <Container>
        <Header />
        <WineCard wine={wine} />
        <ContentWrapper>
          <ReviewCardList reviews={reviews} />
          <Sidebar>
            <RatingSummary reviews={reviews} />
          </Sidebar>
        </ContentWrapper>
      </Container>
    </>
  );
}
