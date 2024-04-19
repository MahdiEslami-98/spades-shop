"use client";
import { IProductsRes } from "@/types/getProductsRes";
import Link from "next/link";
import React, { MutableRefObject, useCallback, useRef } from "react";
import Button from "../button";
import { FaRocket, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";

const CategoryItem = ({ data }: { data: IProductsRes }) => {
  const slider = useRef(null);
  const handleNext = useCallback((sliderRef: MutableRefObject<any>) => {
    if (!slider.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);
  const handlePrev = useCallback((sliderRef: MutableRefObject<any>) => {
    if (!slider.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        className="rounded-full border border-black bg-black p-1 text-white hover:bg-white hover:text-black"
        onClick={() => handleNext(slider)}
      >
        <FaArrowRight />
      </Button>
      <Swiper
        ref={slider}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={6}
        breakpoints={{
          500: { slidesPerView: 2, spaceBetween: 16 },
          1000: { slidesPerView: 3, spaceBetween: 26 },
          1125: { slidesPerView: 4, spaceBetween: 36 },
        }}
      >
        {data.data.products?.slice(0, 6)?.map((item) => (
          <SwiperSlide key={item._id} className="px-1">
            <Link href={`/product/${item._id}`}>
              <div className="max-w-72 overflow-hidden rounded-md border border-black px-4 py-2 shadow-sm hover:shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full py-1"
                  src={process.env.PRODUCT_THUMB + item.thumbnail}
                  alt={item.name}
                />
                <p className="py-1 text-sm font-medium capitalize">
                  {item.brand}
                </p>
                <p className="line-clamp-2 h-14 font-medium">{item.name}</p>
                <div className="mb-2 flex items-center gap-x-2">
                  <FaRocket /> <span>ارسال رایگان و فوری</span>
                </div>
                <p className="text-left">
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &#160; تومان
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        className="rounded-full border border-black bg-black p-1 text-white hover:bg-white hover:text-black"
        onClick={() => handlePrev(slider)}
      >
        <FaArrowLeft />
      </Button>
    </div>
  );
};

export default CategoryItem;
