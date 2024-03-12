"use client";
import getProducts from "@/api/getProducts";
import ProductsPagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productCardSkeleton";
import { ProductsPaginationContext } from "@/context/productsPaginationContext";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";

const ProductsPage = () => {
  const param = useSearchParams();
  const { page, setPage } = useContext(ProductsPaginationContext);
  const [sort, setSort] = useState("-createdAt");
  const category = param.get("category")?.toString();
  const pageParam = param.get("page");
  if (pageParam) {
    setPage(Number(pageParam));
  }
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["products", page, sort, category],
    queryFn: () => getProducts(page, sort, category, 12),
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4 p-2">
          <p className="hidden sm:block">مرتب سازی بر اساس :</p>
          <select
            name="sort"
            onChange={(e) => setSort(e.target.value)}
            className="rounded-3xl border border-black px-3 py-1 text-sm"
          >
            <option value="-createdAt">جدیدترین</option>
            <option value="-price">گرانترین</option>
            <option value="price">ارزانترین</option>
            <option value="-quantity">بیشترین</option>
            <option value="quantity">کمترین</option>
          </select>
        </div>
        <div>
          <p>{data && data.total} کالا</p>
        </div>
      </div>
      <div className="grid grid-cols-12">
        {data?.data.products?.map((item) => (
          <ProductCard item={item} key={item._id} />
        ))}
        {isLoading &&
          Array.from({ length: 6 }, (_, i) => i + 1).map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
      {isSuccess && data && (
        <ProductsPagination total={data.total_pages} params={param} />
      )}
      {isError && <p className="text-center">محصول مورد نظر یافت نشد</p>}
    </div>
  );
};

export default ProductsPage;
