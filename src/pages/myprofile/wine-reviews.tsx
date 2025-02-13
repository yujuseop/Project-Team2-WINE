import React from "react";
import WineList from "@/pages/myprofile/components/WineList";

const WineReviewsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">내가 쓴 와인 후기</h1>
      <WineList />
    </div>
  );
};

export default WineReviewsPage;
