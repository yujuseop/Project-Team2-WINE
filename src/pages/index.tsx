import Head from "next/head";
import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import CancelButton from "@/components/CancelButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>와인</title>
      </Head>
      <div>
        <p>Pretendard 적용</p>
        <PrimaryButton size="small">primary</PrimaryButton>
        <CancelButton size="small">Cancel</CancelButton>
      </div>
    </>
  );
}
