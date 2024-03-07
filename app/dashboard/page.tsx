"use client";
import OrderTable from "@/components/orderTable";
import OrdersPageProvider from "@/context/ordersPageContext";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import React from "react";

const Manager = () => {
  useAuthAdmin();
  return (
    <OrdersPageProvider>
      <OrderTable />
    </OrdersPageProvider>
  );
};

export default Manager;
