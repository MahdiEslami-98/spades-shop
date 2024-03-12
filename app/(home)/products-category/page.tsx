"use client";
import getProducts from "@/api/getProducts";
import ProductsPagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productCardSkeleton";
import { ProductsPaginationContext } from "@/context/productsPaginationContext";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useContext } from "react";

const ProductsPage = () => {
  const param = useSearchParams();
  const { page, setPage } = useContext(ProductsPaginationContext);
  const category = param.get("category")?.toString();
  const pageParam = param.get("page");
  if (pageParam) {
    setPage(Number(pageParam));
  }
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["products", page, category],
    queryFn: () => getProducts(page, "", category, 12),
  });
  return (
    <div>
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
