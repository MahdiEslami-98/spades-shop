"use server";
import getAllCategory from "@/api/getAllCategory";
import ProductsPaginationProvider from "@/context/productsPaginationContext";
import Link from "next/link";
import React, { ReactNode, Suspense } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const cats = await getAllCategory();
  return (
    <div className="container mx-auto py-4">
      <div className="grid gap-x-6 md:grid-cols-12 md:grid-rows-none">
        <div className="top-32  rounded-md border border-black p-4 md:sticky md:col-span-3 md:min-h-[450px] xl:col-span-2">
          <Link href={`/products-category?page=1`}>همه محصولات</Link>
          <div>
            <h2 className="pt-3 text-xl font-bold">برندها</h2>
            <ul className="flex list-disc flex-wrap gap-x-10 pr-4 md:block">
              {cats?.data.categories.map((cat) => (
                <li className="py-2 text-sm font-light" key={cat._id}>
                  <Link href={`/products-category?category=${cat._id}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <h2 className="pt-3 text-xl font-bold">فیلترها</h2>
          </div> */}
        </div>
        <div className="row-span-11 p-4 md:col-span-9 xl:col-span-10">
          <ProductsPaginationProvider>{children}</ProductsPaginationProvider>
        </div>
      </div>
    </div>
  );
};

export default Layout;
