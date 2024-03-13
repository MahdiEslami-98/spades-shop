"use client";
import React, { useContext } from "react";
import Button from "../button";
import { FaPlus } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import ProductsHead from "./components/productsHead";
import { useQuery } from "@tanstack/react-query";
import { ProductsTablePageContext } from "@/context/productTablePageContext";
import getProducts from "@/api/getProducts";
import ProductsRow from "./components/productsRow";
import ProductPagination from "./components/productsPagination";
import BigerSpinner from "../spinner/bigerSpinner";

const ProductsTable = () => {
  const { page } = useContext(ProductsTablePageContext);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["mProducts", page],
    queryFn: () => getProducts(page, "-createdAt"),
  });
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="pr-8 text-xl md:text-2xl">کالاها</p>
        </div>
        <div className="flex items-center gap-x-2 rounded-md bg-black px-2 py-1 text-white">
          <Button>افزودن کالا</Button>
          <FaPlus />
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-md border">
        <Table className="table-auto border-collapse">
          <TableHeader>
            <ProductsHead />
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data &&
              data.data.products?.map((item) => (
                <ProductsRow key={item._id} data={item} />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {isSuccess && data && (
                <ProductPagination total={data?.total_pages} />
              )}
            </TableRow>
          </TableFooter>
        </Table>
        {isLoading && <BigerSpinner />}
      </div>
    </div>
  );
};

export default ProductsTable;
