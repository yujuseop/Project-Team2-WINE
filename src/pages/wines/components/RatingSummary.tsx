import { FaStar, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

interface Review {
  rating: number;
}

interface RatingSummaryProps {
  reviews: Review[];
  avgRatings: { [key: string]: number }; // 평점별 개수
}

const SummaryContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--gray-300);
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
`;

const RatingBar = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 0.9rem;
    color: #666;
    min-width: 20px;
  }

  div {
    flex: 1;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    position: relative;
  }

  div::after {
    content: "";
    position: absolute;
    height: 8px;
    width: ${({ width }) => width}%;
    background: #7d4cdb; /* 보라색 */
    border-radius: 4px;
  }
`;

const ReviewCount = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 8px 12px;
  background: #7d4cdb;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function RatingSummary({
  reviews,
  avgRatings,
}: RatingSummaryProps) {
  if (!reviews || reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(1);
  const roundedRating = Math.floor(Number(avgRating));

  return (
    <SummaryContainer>
      <h2>{avgRating}</h2>
      <StarsContainer>
        {Array.from({ length: 5 }, (_, i) =>
          i < roundedRating ? (
            <FaStar key={i} color="gold" size={20} />
          ) : (
            <FaRegStar key={i} color="gray" size={20} />
          )
        )}
      </StarsContainer>
      <ReviewCount>{totalReviews.toLocaleString()}개의 후기</ReviewCount>

      <RatingBarContainer>
        {Array.from({ length: 5 }, (_, i) => {
          const score = 5 - i;
          const percentage = totalReviews
            ? (avgRatings[score] / totalReviews) * 100
            : 0;
          return (
            <RatingBar key={score} width={percentage}>
              <span>{score}점</span>
              <div />
            </RatingBar>
          );
        })}
      </RatingBarContainer>

      <SubmitButton>리뷰 남기기</SubmitButton>
    </SummaryContainer>
  );
}
