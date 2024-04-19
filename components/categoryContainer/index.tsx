import React from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import Image from "next/image";
import { IProductsRes } from "@/types/getProductsRes";
import { ICategory } from "@/types/getAllCategoryRes";
import CategoryItem from "../categoryItem";
import { Swiper } from "swiper/react";

const CategoryContainer = ({
  data,
  category,
  index,
}: {
  data: IProductsRes;
  category: ICategory;
  index: number;
}) => {
  return (
    <>
      {data.data.products && data.data.products?.length > 3 && (
        <div className="relative rounded-3xl border border-black px-3 py-4 text-xs sm:text-sm md:text-base">
          <div className="absolute -top-4 flex w-full items-center justify-between px-4">
            <div className="flex items-center gap-x-2 bg-white px-4">
              <figure>
                <Image src={"/Spades.svg"} width={20} height={20} alt="logo" />
              </figure>
              <p className="text-xl font-semibold">
                {category.data.categories[index].name}
              </p>
            </div>
            {/* <div className="mx-4 h-0 flex-1 border-t border-black"></div> */}
            <Link
              href={
                "/products-category?category=" +
                category.data.categories[index]._id
              }
              className={
                "ml-4 flex items-center gap-x-2 bg-white px-4 text-sm hover:underline"
              }
            >
              <span>مشاهده همه</span> <FaAngleLeft />
            </Link>
          </div>
          <div>
            <CategoryItem data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryContainer;
