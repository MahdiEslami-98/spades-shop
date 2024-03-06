import Button from "@/components/button";
import { OrdersPageContext } from "@/context/ordersPageContext";
import React, { useContext } from "react";

const OrdersPagination = ({ p, total }: { p: number; total: number }) => {
  const { page, setPage } = useContext(OrdersPageContext);
  const nextPageHandler = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };
  const pervPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="-my-1 flex items-center justify-end gap-x-2">
      <Button
        className="rounded-md border border-black px-2 py-1"
        onClick={nextPageHandler}
      >
        بعدی
      </Button>
      <Button
        className="rounded-md border border-black px-2 py-1"
        onClick={pervPageHandler}
      >
        قبلی
      </Button>
    </div>
  );
};

export default OrdersPagination;
