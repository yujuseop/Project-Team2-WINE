import React from "react";

// ✅ WineReview 타입 정의
interface WineReview {
  id: number;
  rating: number;
  timeAgo: string;
  wineName: string;
  reviewText: string;
}

const WineListCard: React.FC<{ review: WineReview }> = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 max-w-2xl mx-auto">
      {/* ⭐ 별점 & 시간 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1">
          <span className="bg-purple-100 text-purple-600 font-bold text-md px-2 py-1 rounded-lg">⭐ {review.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-sm">{review.timeAgo}</span>
        </div>
        {/* 옵션 버튼 (수정/삭제) */}
        <button className="text-gray-500 hover:text-gray-700">⋮</button>
      </div>

      {/* 🏷️ 와인 이름 */}
      <h2 className="text-blue-600 font-semibold text-md cursor-pointer hover:underline">
        {review.wineName}
      </h2>

      {/* 📝 리뷰 내용 */}
      <p className="text-gray-600 mt-2 text-sm">{review.reviewText}</p>
    </div>
  );
};

export default WineListCard;
