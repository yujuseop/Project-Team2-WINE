import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Landing.module.css";

const wineImages = [
  "/assets/images/card/wine1.svg",
  "/assets/images/card/wine2.svg",
  "/assets/images/card/wine3.svg",
  "/assets/images/card/wine4.svg",
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 2, // 한 번에 3개씩 표시
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false,
};

export default function Home() {
  return (
    <>
      <Head>
        <title>WHYNE</title>
      </Head>
      <div className={styles.landing_container}>
        <Header />
        {/* 메인 이미지 */}
        <div className={styles.image_wrapper}>
          <Image
            src="/assets/images/landing_main.png"
            fill
            alt="Landing Main Image"
            style={{ objectFit: "cover", borderRadius: "16px" }}
            priority
          />
        </div>

        {/* section */}
        <div className={styles.section}>
          {/* section1 */}
          <div className={styles.section_1}>
            <div className={styles.section_title}>
              <h1>
                매달 새롭게 만나는
                <br /> 와인추천 콘텐츠
              </h1>
              <h2>매달 다양한 인기 와인을 만나보세요.</h2>
            </div>
            <div className={styles.section_1_img_container}>
              <h3>이번 달 추천 와인</h3>
              <Slider {...sliderSettings} className={styles.section_1_imgs}>
                {wineImages.map((src, index) => (
                  <div key={index} className={styles.wine_card}>
                    <Image
                      src={src}
                      alt={`추천 와인 ${index + 1}`}
                      width={193}
                      height={160}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* section2 */}
          <div className={styles.section_2}>
            <div className={styles.section_title}>
              <h1>
                다양한 필터로 찾는
                <br />내 맞춤 와인
              </h1>
              <h2>
                와인 타입, 가격, 평점으로
                <br />
                나에게 맞는 와인을 쉽게 검색해요.
              </h2>
            </div>
            {/* section2 정보( type + price ) -> 모바일사이즈에서 없어짐*/}
            <div className={styles.section2_content}>
              <h1>WINE TYPES</h1>
              <ul className={styles.tasty_list}>
                <li>red</li>
                <li className={styles.tasty_white}>white</li>
                <li>sparkling</li>
              </ul>

              <h1 className={styles.price_title}>PRICE</h1>

              <div className={styles.price_container}>
                <div className={styles.price}>
                  <span>₩ 0</span>
                  <span>₩ 74,000</span>
                </div>
                <div className={styles.slider}>
                  <div className={styles.filled_bar}></div>
                  {/* 좌우 핸들 */}
                  <div className={`${styles.handle} ${styles.left}`}></div>
                  <div className={`${styles.handle} ${styles.right}`}></div>
                </div>
              </div>
            </div>
            <div className={styles.section_2_img_container}>
              <Image
                src={"/assets/images/card/wine_card.svg"}
                alt="와인카드"
                fill
                className={styles.section_2_img}
                priority
              />
            </div>
          </div>

          {/* section3 */}
          <div className={styles.section_3}>
            <div className={styles.section_title}>
              <h1>
                직관적인
                <br /> 리뷰 시스템
              </h1>
              <h2>
                더 구체화된 리뷰 시스템으로
                <br />
                쉽고 빠르게 와인 리뷰를 살펴보세요.
              </h2>
            </div>
            <div className={styles.section_3_img_container}>
              <Image
                src={"/assets/images/card/review_img.svg"}
                alt="리뷰 이미지"
                fill
                className={styles.section_3_img}
                priority
              />
            </div>
          </div>
        </div>

        {/* 와인 보러가기 버튼 */}
        <Link href="/wines">
          <PrimaryButton className={styles.button}>와인 보러가기</PrimaryButton>
        </Link>
      </div>
    </>
  );
}
