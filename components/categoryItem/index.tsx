import { ProductsEntity } from "@/types/getProductsRes";
import Link from "next/link";
import React from "react";
import { FaRocket } from "react-icons/fa6";

const CategoryItem = ({item} :{item : ProductsEntity}) => {
  return (
    <>
      <Link
        href={"/product/" + item._id}
        className="col-span-12 overflow-hidden rounded-xl border shadow-md sm:col-span-6  lg:col-span-4"
        key={item._id}
      >
        <div className="w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={process.env.PRODUCT_IMG! + (item.images && item.images[0])}
            alt=""
            className="w-full object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-1 grid-rows-3 gap-y-4 px-8 py-6">
          <p className="text-lg font-medium capitalize">{item.brand}</p>
          <p className="overflow-hidden text-ellipsis text-nowrap font-medium">
            {item.name}
          </p>
          <div className="flex items-center justify-between">
            <p>قیمت</p>
            <p className="text-left">
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              تومان
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaRocket /> <span>ارسال رایگان و فوری</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryItem;
