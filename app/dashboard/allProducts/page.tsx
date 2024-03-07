"use client";
import ProductsTable from "@/components/productsTable";
import ProductsPageProvider from "@/context/productPageContext";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import React from "react";

const AllProducts = () => {
  useAuthAdmin();
  return (
    <ProductsPageProvider>
      <ProductsTable />
    </ProductsPageProvider>
  );
};

export default AllProducts;
