import { ICategory } from "@/types/getAllCategoryRes";
import Link from "next/link";
import React from "react";

const Category = ({ category }: { category: ICategory }) => {
  return (
    <>
      <h1 className="px-4 text-3xl font-bold">دسته بندی ها</h1>
      <div className="mx-4 h-0 flex-1 border-t border-black"></div>
      <div className="grid grid-cols-12 border-b border-black py-4">
        {category &&
          category.data.categories.map((item, i) => (
            <Link
              href={
                "/products-category?category=" + category.data.categories[i]._id
              }
              key={i}
              className="col-span-4 flex  flex-col items-center gap-y-3 text-sm hover:underline md:col-span-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={process.env.CATEGORY_ICON + item.icon}
                alt={item.slugname}
                className="w-20 rounded-xl"
              />
              <p className="flex items-center gap-x-2 font-medium md:text-lg">
                {category.data.categories[i].name}
              </p>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Category;
