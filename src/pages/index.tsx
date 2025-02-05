import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import CancelButton from "@/components/CancelButton";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <p>Pretendard 적용</p>
        <PrimaryButton size="small">primary</PrimaryButton>
        <CancelButton size="small">Cancel</CancelButton>
      </div>
    </>
  );
}
