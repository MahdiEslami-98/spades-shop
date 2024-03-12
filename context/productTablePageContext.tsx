"use client";
import React, { ReactNode, createContext, useState } from "react";

export const ProductsTablePageContext = createContext({
  page: 1,
  setPage: (value: number) => {},
});

const ProductsTablePageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  return (
    <ProductsTablePageContext.Provider value={{ page, setPage }}>
      {children}
    </ProductsTablePageContext.Provider>
  );
};

export default ProductsTablePageProvider;
