import React from "react";
import Head from "next/head";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import styles from "./Landing.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import ProfileCard from "@/pages/myprofile/components/ProfileCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>WHYNE</title>
      </Head>
      <Header />
      <div className={styles.image_wrapper}>
        <Image
          src="/assets/images/landing_main.png"
          width={1140}
          height={535}
          alt="Landing Main Image"
        />
      </div>
      <Link href="/wines">
        <PrimaryButton className={styles.button}>와인 보러가기</PrimaryButton>
      </Link>
      <ProfileCard />
    </>
  );
}
