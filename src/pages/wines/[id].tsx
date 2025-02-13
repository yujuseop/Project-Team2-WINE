import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import instance from "@/libs/axios";
import Header from "@/components/Header";
import WineCard from "./components/WineCard";
import ReviewCardList from "./components/ReviewCardList";
import RatingSummary from "./components/RatingSummary";
import styles from "./WineDetailPage.module.css";
import { parseCookies } from "nookies"; // SSR에서 쿠키 파싱

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
  avgRatings: { [key: string]: number }; // 평점별 개수 추가
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
          avgRatings: {},
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

    // 평점별 개수 계산
    const avgRatings: { [key: string]: number } = {
      "5": 0,
      "4": 0,
      "3": 0,
      "2": 0,
      "1": 0,
    };
    reviews.forEach((review) => {
      const ratingKey = String(review.rating);
      if (avgRatings[ratingKey] !== undefined) {
        avgRatings[ratingKey]++;
      }
    });

    return {
      props: { wine: response.data, error: null, reviews, avgRatings },
    };
  } catch (error) {
    console.error("와인 정보를 불러오는데 실패했습니다.", error);
    return {
      props: {
        wine: null,
        error: "와인 정보를 불러오는데 실패했습니다.",
        reviews: [],
        avgRatings: {},
      },
    };
  }
};

export default function WineDetailPage({
  wine,
  reviews,
  avgRatings,
  error,
}: WineDetailProps) {
  if (error) return <p className={styles.errorMessage}>{error}</p>;
  if (!wine)
    return <p className={styles.errorMessage}>와인 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <Head>
        <title>WHYNE - 와인 상세 페이지</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <WineCard wine={wine} />
        <div className={styles.contentWrapper}>
          <ReviewCardList reviews={reviews} />
          <div className={styles.sidebar}>
            <RatingSummary reviews={reviews} avgRatings={avgRatings} />
          </div>
        </div>
      </div>
    </>
  );
}
