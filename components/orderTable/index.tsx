"use client";

import getOrders from "@/api/getOrders";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import Input from "../input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import Row from "./components/row";
import Head from "./components/head";
import BigerSpinner from "../spinner/bigerSpinner";
import OrdersPagination from "./components/ordersPagination";
import { OrdersPageContext } from "@/context/ordersPageContext";

const OrderTable = () => {
  const [stat, setStat] = useState("");
  const { page, setPage } = useContext(OrdersPageContext);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["orders", stat, page],
    queryFn: () => getOrders(stat, page),
  });
  const orderStatusChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setStat(e.target.value);
    setPage(1);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-xl md:pr-8 md:text-2xl">سفارش ها</p>
        </div>
        <form
          onChange={orderStatusChangeHandler}
          className="flex flex-col items-end gap-x-1 sm:flex-row-reverse sm:items-center md:gap-x-8 "
        >
          <div className="flex items-center gap-x-1">
            <label htmlFor="all">همه</label>
            <Input
              type="radio"
              value={""}
              name="stat"
              id="all"
              defaultChecked
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="delivered">تحویل شده</label>
            <Input type="radio" value={"true"} name="stat" id="delivered" />
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="pending">در انتظار ارسال</label>
            <Input type="radio" value={"false"} name="stat" id="pending" />
          </div>
        </form>
      </div>
      <div className="mb-2 mt-8 rounded-md border">
        <Table className="table-auto border-collapse">
          <TableHeader>
            <Head />
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data &&
              data.data.orders.map((item) => (
                <Row key={item._id} data={item}></Row>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                {isSuccess && data?.page && data.total_pages && (
                  <OrdersPagination p={data?.page} total={data?.total_pages} />
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {isLoading && (
          <div>
            <BigerSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
