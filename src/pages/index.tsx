import React from "react";
import Head from "next/head";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import CancelButton from "@/components/CancelButton";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>와인</title>
      </Head>
      <Header />
      <div>
        <PrimaryButton size="small">primary</PrimaryButton>
        <CancelButton size="small">Cancel</CancelButton>
      </div>
      <Link href="/wines">와인 보러가기</Link>
    </>
  );
}
