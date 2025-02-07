import styled from "styled-components";

interface Review {
  rating: number;
  content: string; // comment -> content로 수정
  createdAt: string;
}

const SummaryContainer = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

interface RatingSummaryProps {
  reviews: Review[];
}

export default function RatingSummary({ reviews }: RatingSummaryProps) {
  // reviews가 빈 배열이거나 undefined일 때 "평점 정보 없음" 표시
  if (!reviews || reviews.length === 0) return <p>평점 정보 없음</p>;

  // 평균 평점을 계산
  const avgRating = (
    reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) /
    reviews.length
  ).toFixed(1);

  return (
    <SummaryContainer>
      <h3>{avgRating} ★</h3>
      <p>총 {reviews.length}개의 리뷰</p>
    </SummaryContainer>
  );
}
