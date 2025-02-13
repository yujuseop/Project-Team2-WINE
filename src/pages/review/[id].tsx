import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/libs/axios";

// ✅ Review 타입 정의
interface ReviewDetail {
  id: number;
  rating: number;
  timeAgo: string;
  wineName: string;
  reviewText: string;
}

const ReviewDetailPage: React.FC = () => {
  const [review, setReview] = useState<ReviewDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchReviewDetail = async () => {
      try {
        const response = await axiosInstance.get(`https://winereview-api.vercel.app/12-2/reviews/${id}`);
        console.log("리뷰 상세 API 응답:", response.data);

        const detail = response.data;
        setReview({
          id: detail.id,
          rating: detail.rating || 0,
          timeAgo: new Date(detail.createdAt).toLocaleDateString("ko-KR"),
          wineName: detail.wine.name || "Unknown Wine",
          reviewText: detail.content || "리뷰 내용이 없습니다.",
        });
      } catch (error) {
        console.error("리뷰 상세 정보를 가져오는 중 오류 발생:", error);
        setError("리뷰 상세 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!review) return <p>리뷰 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-purple-600 font-bold text-lg">⭐ {review.rating.toFixed(1)}</span>
        <span className="text-gray-400 text-sm">{review.timeAgo}</span>
      </div>
      <h2 className="text-blue-600 font-semibold text-md cursor-pointer hover:underline mt-2">
        {review.wineName}
      </h2>
      <p className="text-gray-600 mt-2 text-sm">{review.reviewText}</p>
    </div>
  );
};

export default ReviewDetailPage;
