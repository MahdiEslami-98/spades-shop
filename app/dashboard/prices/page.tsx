import PricesTable from "@/components/pricesTable";
import PricesPageProvider from "@/context/pricesPageContext";
import React from "react";

const prices = () => {
  return (
    <>
      <PricesPageProvider>
        <PricesTable />
      </PricesPageProvider>
    </>
  );
};

export default prices;
