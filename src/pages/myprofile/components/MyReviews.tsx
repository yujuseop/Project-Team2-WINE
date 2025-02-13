import React, { useEffect, useState } from "react";
import axios from "@/libs/axios";
import TimeAgo from "@/components/TimeAgo";
import styles from "./MyReviews.module.css";

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
    <div className={styles.container}>
      {loading ? (
        <p>로딩 중...</p>
      ) : myReviews.length > 0 ? (
        <ul className={styles.list}>
          {myReviews.map((review) => (
            <li key={review.id} className={styles.review_cards}>
              <div className={styles.header}>
                <div className={styles.meta}>
                  <div className={styles.rating}>
                    <img src="/assets/icon/star.svg" alt="star img" />
                    <p>{review.rating}.0</p>
                  </div>
                  <p>
                    <TimeAgo date={review.createdAt} />
                  </p>
                </div>
                <img src="/assets/icon/dot_menu.svg" alt="delete/write menu" />
              </div>
              <p className={styles.wine_name}>{review.wine.name}</p>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
}
