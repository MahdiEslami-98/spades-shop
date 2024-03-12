"use client";
import ProductsTable from "@/components/productsTable";
import ProductsTablePageProvider from "@/context/productTablePageContext";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import React from "react";

const AllProducts = () => {
  useAuthAdmin();
  return (
    <ProductsTablePageProvider>
      <ProductsTable />
    </ProductsTablePageProvider>
  );
};

export default AllProducts;
