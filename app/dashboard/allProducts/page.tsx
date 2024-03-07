import ProductsTable from "@/components/productsTable";
import ProductsPageProvider from "@/context/productPageContext";
import React from "react";

const allProducts = () => {
  return (
    <ProductsPageProvider>
      <ProductsTable />
    </ProductsPageProvider>
  );
};

export default allProducts;
