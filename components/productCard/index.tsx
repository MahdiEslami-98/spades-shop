import React from "react";
import { FaTruckFast, FaGift } from "react-icons/fa6";
import Link from "next/link";
import { ProductsEntity } from "@/types/getProductsRes";

const ProductCard = ({ item }: { item: ProductsEntity }) => {
  return (
    <Link
      href={`/product/${item._id}`}
      className="hover:drop-shadow-base col-span-12 border hover:z-10 hover:shadow-md sm:col-span-6 lg:col-span-4"
    >
      <div className="mx-2 my-4 overflow-hidden rounded-md">
        <img
          src={process.env.PRODUCT_THUMB + item.thumbnail}
          alt={item.name}
          className=""
        />
      </div>
      <div className="flex flex-col gap-y-4 p-4">
        <p className="overflow-hidden text-ellipsis text-nowrap">{item.name}</p>
        <p className="flex items-center gap-x-2">
          <FaTruckFast /> <span>ارسال رایگان و فوری</span>
        </p>
        <p className="flex items-center gap-x-2">
          <FaGift /> <span>به همراه هدیه اسپادز</span>
        </p>
        <p className="text-left">
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          تومان
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
