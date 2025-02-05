import Head from "next/head";
import React from "react";
import Header from "@/components/Header";


export default function Home() {
  return (
    <>
      <Head>
        <title>와인</title>
      </Head>
      <div>
        <Header/>
        <p>Pretendard 적용</p>
      </div>
    </>
  );
}
