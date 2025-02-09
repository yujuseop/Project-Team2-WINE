import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import Image from "next/image";
import styles from "./Landing.module.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export const useWineSwiper = () => {
  const slides = [
    <div className={styles.additional_textbox} key="slide1">
      <Image
        src="/assets/images/wine-bottle1.png"
        width={38}
        height={136}
        alt="Wine Bottle"
        className={styles.wine_bottle_image}
      />
      <div className={styles.rating_container}>
        <span className={styles.wine_rating}>4.8</span>
        <Image
          src="/assets/images/star-score.png"
          width={60}
          height={12}
          alt="Star Score"
          className={styles.star_score}
        />
        <span className={styles.wine_name}>Sentinel Cabernet Sauvignon 2016</span>
      </div>
    </div>,
    <div className={styles.additional_textbox} key="slide2">
      <Image
        src="/assets/images/wine-bottle2.png"
        width={38}
        height={136}
        alt="Wine Bottle 2"
        className={styles.wine_bottle_image}
      />
      <div className={styles.rating_container}>
        <span className={styles.wine_rating}>4.3</span>
        <Image
          src="/assets/images/star-score.png"
          width={60}
          height={12}
          alt="Star Score"
          className={styles.star_score}
        />
        <span className={styles.wine_name}>Sentinel Cabernet Sauvignon 2016</span>
      </div>
    </div>
  ];

  return (
    <Swiper
      modules={[Navigation, Scrollbar, Autoplay]}
      spaceBetween={10}
      slidesPerView={2}
      navigation
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000 }}
      className={styles.mySwiper}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};
