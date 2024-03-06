"use client";
import { ReactNode, createContext, useState } from "react";

export const PricesPageContext = createContext({
  page: 1,
  setPage: (value: number) => {},
});

import React from "react";

const PricesPageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  return (
    <PricesPageContext.Provider value={{ page, setPage }}>
      {children}
    </PricesPageContext.Provider>
  );
};

export default PricesPageProvider;
