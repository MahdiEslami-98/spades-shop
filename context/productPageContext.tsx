"use client";
import React, { ReactNode, createContext, useState } from "react";

export const ProductsPageContext = createContext({
  page: 1,
  setPage: (value: number) => {},
});

const ProductsPageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  return (
    <ProductsPageContext.Provider value={{ page, setPage }}>
      {children}
    </ProductsPageContext.Provider>
  );
};

export default ProductsPageProvider;
