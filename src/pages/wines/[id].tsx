import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import WineCard from "./components/WineCard";
import ReviewCardList from "./components/ReviewCardList";
import RatingSummary from "./components/RatingSummary";
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

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  min-width: 280px;
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

export const getServerSideProps = async (context: { params: Params }) => {
  const { id } = context.params;

  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM4ODYwNzY4LCJleHAiOjE3Mzk0NjU1NjgsImlzcyI6InNwLWVwaWdyYW0ifQ.PGWIWJDiCAygHw07XCduvFuFIiMIepdtutKu6faUZzY";
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
