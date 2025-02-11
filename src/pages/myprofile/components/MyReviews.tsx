import React, { useEffect, useState } from "react";
import axios from "@/libs/axios";
import TimeAgo from "@/components/TimeAgo";

interface Wine {
  name: string;
}

interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  wine: Wine;
}

interface ReviewApiResponse {
  list: Review[];
  totalCount: number;
  nextCursor: string | null;
}

export default function MyReviews() {
  // ✅ 함수명 수정
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchMyReviews = async () => {
    try {
      const response = await axios.get<ReviewApiResponse>("/users/me/reviews", {
        params: { limit },
      });

      console.log("서버 응답 데이터:", response.data);
      setMyReviews(response.data.list);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return (
    <div>
      <h2>내가 쓴 후기</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : myReviews.length > 0 ? (
        <ul>
          {myReviews.map((review) => (
            <li key={review.id}>
              <h3>{review.wine.name}</h3>
              <p>평점: {review.rating}</p>
              <p>
                작성 날짜: <TimeAgo date={review.createdAt} />
              </p>
              <p>리뷰 내용: {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
}
