import React from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import Image from "next/image";
import { IProductsRes } from "@/types/getProductsRes";
import { ICategory } from "@/types/getAllCategoryRes";
import CategoryItem from "../categoryItem";

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
      <div className="border-b border-black py-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-x-2 px-1">
            <figure>
              <Image src={"/Spades.svg"} width={20} height={20} alt="logo" />
            </figure>
            <p className="text-xl font-semibold">
              {category.data.categories[index].name}
            </p>
          </div>
          <div className="mx-4 h-0 flex-1 border-t border-black"></div>
          <Link
            href={
              "/products-category?category=" +
              category.data.categories[index]._id
            }
            className={"flex items-center gap-x-2 text-sm hover:underline"}
          >
            <span>مشاهده همه</span> <FaAngleLeft />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-x-10 gap-y-12 py-4 sm:px-0">
          {data.data.products?.map((item) => <CategoryItem key={item._id} item={item}/>)}
        </div>
      </div>
    </>
  );
};

export default CategoryContainer;
