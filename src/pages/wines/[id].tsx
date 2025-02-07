import { ParsedUrlQuery } from "querystring";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import Head from "next/head";
import WineCard from "./components/WineCard";
import ReviewCard from "./components/ReviewCard";
import RatingSummary from "./components/RatingSummary";
import styled from "styled-components";
import Image from "next/image";

// 스타일드 컴포넌트
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

const ReviewsContainer = styled.div`
  flex: 2;
`;

const Sidebar = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Title = styled.h1`
  color: var(--gray-800);
  font-size: var(--font-size-body1);
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 20px;
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
  name: string | null;
  profileImage: string | null;
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
  userName: string | null;
  userProfileImage: string | null;
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

    // 리뷰 데이터 처리
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
        user: {
          nickname: review.userName ?? "Anonymous", // 기본값 "Anonymous"
          image: review.userProfileImage ?? "", // 기본값 빈 문자열
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
        {/* 리뷰목록 부분 */}
        <ContentWrapper>
          <ReviewsContainer>
            <Title>리뷰 목록</Title>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <>
                <Image
                  src="/assets/images/no_review.svg"
                  alt="리뷰 없음"
                  width={136} // 원하는 너비
                  height={136} // 원하는 높이
                  priority // 중요한 이미지라면 (페이지 로딩 시 바로 로드)
                />
                <p>작성된 리뷰가 없어요</p>
              </>
            )}
          </ReviewsContainer>
          <Sidebar>
            <RatingSummary reviews={reviews} />
          </Sidebar>
        </ContentWrapper>
      </Container>
    </>
  );
}
