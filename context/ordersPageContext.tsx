"use client";
import React, { ReactNode, createContext, useState } from "react";

export const OrdersPageContext = createContext({
  page: 1,
  setPage: (value: number) => {},
});

const OrdersPageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  return (
    <OrdersPageContext.Provider value={{ page, setPage }}>
      {children}
    </OrdersPageContext.Provider>
  );
};

export default OrdersPageProvider;
