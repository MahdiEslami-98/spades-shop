import OrderTable from "@/components/orderTable";
import OrdersPageProvider from "@/context/ordersPageContext";
import React from "react";

const Manager = () => {
  return (
    <OrdersPageProvider>
      <OrderTable />
    </OrdersPageProvider>
  );
};

export default Manager;
