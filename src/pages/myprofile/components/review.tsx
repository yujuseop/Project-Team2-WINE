import React from "react";
import WineList from "@/pages/myprofile/components/WineList";

const ReviewPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Wine Reviews</h1>
      <WineList/>
    </div>
  );
};

export default ReviewPage;
