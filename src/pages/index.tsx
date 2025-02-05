import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>와인</title>
      </Head>
      <div>
        <Link href="/wines">와인 보러가기</Link>
      </div>
    </>
  );
}
