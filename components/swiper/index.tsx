"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ className }: { className?: string }) => {
  return (
    <Swiper
      className={className + " left-to-right -z-10 w-full rounded-lg"}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{ enabled: true }}
      a11y={{
        enabled: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/534.gif"} alt="slide4" />
      </SwiperSlide>
      <SwiperSlide>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/401.webp"} alt="slide2" />
      </SwiperSlide>
      <SwiperSlide>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/429.webp"} alt="slide3" />
      </SwiperSlide>
      <SwiperSlide>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/386.webp"} alt="slide1" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
