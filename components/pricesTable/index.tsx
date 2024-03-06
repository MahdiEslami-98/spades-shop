"use client";
import React, { useContext } from "react";
import Button from "../button";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/api/getProducts";
import PricesHead from "./components/pricesHead";
import PricesRow from "./components/row";
import PricesPagination from "./components/pricesPagination";
import BigerSpinner from "../spinner/bigerSpinner";
import { PricesPageContext } from "@/context/pricesPageContext";

const PricesTable = () => {
  const { page } = useContext(PricesPageContext);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["prices", page],
    queryFn: () => getProducts(page),
  });
  return (
    <div className="">
      <div className="flex justify-between md:px-4">
        <div>
          <p className="text-xl md:text-2xl">موجودی و قیمت ها</p>
        </div>
        <div className="">
          <Button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">
            ذخیره
          </Button>
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-md border">
        <Table className="table-auto border-collapse">
          <TableHeader>
            <PricesHead />
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data &&
              data.data.products?.map((item) => (
                <PricesRow key={item._id} data={item} />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {isSuccess && data && (
                <PricesPagination total={data?.total_pages} />
              )}
            </TableRow>
          </TableFooter>
        </Table>
        {isLoading && <BigerSpinner />}
      </div>
    </div>
  );
};

export default PricesTable;
