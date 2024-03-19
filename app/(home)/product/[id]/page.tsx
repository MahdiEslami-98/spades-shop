"use client";
import getProductById from "@/api/getProductById";
import Button from "@/components/button";
import { useQuery } from "@tanstack/react-query";
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Input from "@/components/input";
import { useDebouncedCallback } from "use-debounce";
import SkeletonPicture from "@/utils/icons/skeletonPicture";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [quantity, setQuantity] = useState(1);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProductById(params.id),
  });

  if (isSuccess) {
    document.title = data?.data.product.name!;
  }

  const debounce = useDebouncedCallback((value) => {
    if (Number(value) < 1) {
      setQuantity(1);
    }
    if (Number(value) > data?.data.product.quantity!) {
      setQuantity(data?.data.product.quantity!);
    }
  }, 700);

  const moreTextHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const btn = e.target as HTMLButtonElement;
    if (btn.innerText === "بیشتر") {
      btn.innerText = "بستن";
      paragraph.current?.classList.remove("line-clamp-2");
    } else if (btn.innerText === "بستن") {
      btn.innerText = "بیشتر";
      paragraph.current?.classList.add("line-clamp-2");
    }
  };

  const quantityChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuantity(Number(e.target.value));
    debounce(Number(e.target.value));
  };

  return (
    <div className="container mx-auto py-8">
      {isSuccess && data && (
        <>
          <div className="grid grid-cols-12 gap-y-4 sm:gap-x-8 sm:px-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <Swiper
                className="left-to-right w-full rounded-lg"
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={5}
                slidesPerView={1}
                navigation={{ enabled: true }}
                loop
              >
                {data.data.product.images.map((item, i) => (
                  <SwiperSlide key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={process.env.PRODUCT_IMG + item}
                      alt={data.data.product.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-span-12 flex h-52 flex-col justify-between md:col-span-6 md:h-full lg:col-span-7">
              <div>
                <Link
                  href={`/products-category?category=${data.data.product.category._id}&page=1`}
                  className="text-sm font-medium text-blue-500  hover:underline"
                >
                  {data.data.product.brand.toUpperCase()}
                </Link>
                <p className="text-2xl font-bold">{data.data.product.name}</p>
              </div>
              <div className="self-end pl-4">
                <p className="text-left text-xl font-bold">
                  {data.data.product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  تومان
                </p>
                <form className="flex flex-row-reverse items-center gap-x-2 pt-2">
                  <Button
                    className="rounded-md bg-black px-4 py-2 text-white"
                    disabled
                  >
                    افزودن به سبد خرید
                  </Button>
                  <div className="flex items-end gap-x-2">
                    <label htmlFor="quantity" className="font-medium">
                      تعداد:
                    </label>
                    <Input
                      onChange={(e) => quantityChangeHandler(e)}
                      id="quantity"
                      type="number"
                      className="w-16 rounded-md border border-black px-2 py-1 text-center focus:shadow-gray-500 focus:ring-1 focus:ring-gray-500"
                      value={quantity}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <h2>توضیحات محصول:</h2>
            <div>
              <p className="line-clamp-2" ref={paragraph}>
                {data && data.data.product.description}
              </p>
              <Button
                onClick={(e) => moreTextHandler(e)}
                className="font-medium text-blue-500 underline hover:no-underline"
              >
                بیشتر
              </Button>
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="grid animate-pulse grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <SkeletonPicture />
          </div>
          <div className="col-span-12 flex h-52 flex-col justify-around px-8 md:col-span-6 md:h-full lg:col-span-7">
            <div className="h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col gap-y-6">
              <div className="h-3 rounded-full bg-gray-200"></div>
              <div className="h-3 rounded-full bg-gray-200"></div>
              <div className="h-3 rounded-full bg-gray-200"></div>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="h-3 rounded-full bg-gray-200"></div>
              <div className="h-3 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      )}
      {isError && <p className="text-center">محصول مورد نظر یافت نشد</p>}
    </div>
  );
};

export default ProductPage;
