import styled from "styled-components";

interface Review {
  rating: number;
  content: string;
  createdAt: string;
}

const SummaryContainer = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--gray-300);
`;

interface RatingSummaryProps {
  reviews: Review[];
}

export default function RatingSummary({ reviews }: RatingSummaryProps) {
  if (!reviews || reviews.length === 0) return null;

  // 평균 평점을 계산
  const avgRating = (
    reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) /
    reviews.length
  ).toFixed(1);

  return (
    <SummaryContainer>
      <h3>{avgRating} ★</h3>
      <p>{reviews.length}개의 후기</p>
    </SummaryContainer>
  );
}
