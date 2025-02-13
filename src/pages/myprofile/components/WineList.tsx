import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WineListCard from "@/pages/myprofile/components/WineListCard";
import axiosInstance from "@/libs/axios"; // ✅ axios 인스턴스 사용

// ✅ WineReview 타입 정의
interface WineReview {
  id: number;
  rating: number;
  timeAgo: string;
  wineName: string;
  reviewText: string;
}

const WineList: React.FC = () => {
  const [reviews, setReviews] = useState<WineReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWineReviews = async () => {
      try {
        const response = await axiosInstance.get("https://winereview-api.vercel.app/12-2/users/me/reviews?limit=10");
        console.log("API 응답 데이터:", response.data);

        if (!response.data.list) {
          throw new Error("API 응답 데이터가 없습니다.");
        }

        // 🔹 API 응답 데이터를 `WineReview` 타입에 맞게 변환
        const transformedReviews: WineReview[] = response.data.list.map((item: any) => ({
          id: item.id,
          rating: item.rating || 0,
          timeAgo: item.createdAt ? new Date(item.createdAt).toLocaleDateString("ko-KR") : "알 수 없음",
          wineName: item.wine.name || "Unknown Wine",
          reviewText: item.content || "리뷰 내용이 없습니다.",
        }));

        setReviews(transformedReviews);
      } catch (error) {
        console.error("Error fetching wine reviews:", error);
        setError("리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWineReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} onClick={() => router.push(`/wine-review/${review.id}`)} className="cursor-pointer">
            <WineListCard review={review} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">아직 작성한 와인 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default WineList;

