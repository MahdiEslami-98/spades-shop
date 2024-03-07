"use client";
import PricesTable from "@/components/pricesTable";
import PricesPageProvider from "@/context/pricesPageContext";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import React from "react";

const Prices = () => {
  useAuthAdmin();
  return (
    <>
      <PricesPageProvider>
        <PricesTable />
      </PricesPageProvider>
    </>
  );
};

export default Prices;
