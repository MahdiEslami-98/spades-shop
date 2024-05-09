"use client";
// import ProductsTable from "@/components/productsTable";
import ProductsTablePageProvider from "@/context/productTablePageContext";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import dynamic from "next/dynamic";
import React from "react";
const DynamicTable = dynamic(() => import("@/components/productsTable"), {
  ssr: false,
});

const AllProducts = () => {
  useAuthAdmin();
  return (
    <ProductsTablePageProvider>
      <DynamicTable />
    </ProductsTablePageProvider>
  );
};

export default AllProducts;
