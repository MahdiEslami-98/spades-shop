"use client";
import React, { useContext } from "react";
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
import AddProductDialog from "../productManagerModal/addProductDialog";

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
        <div>
          <AddProductDialog />
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-md border">
        <Table className="table-fixed border-collapse">
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
