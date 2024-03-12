"use client";
import React, { ReactNode, createContext, useState } from "react";

export const ProductsPaginationContext = createContext({
  page: 1,
  setPage: (value: number) => {},
});

const ProductsPaginationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  return (
    <ProductsPaginationContext.Provider value={{ page, setPage }}>
      {children}
    </ProductsPaginationContext.Provider>
  );
};

export default ProductsPaginationProvider;
