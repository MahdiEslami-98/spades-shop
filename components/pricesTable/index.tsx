"use client";
import React, { useContext, useState } from "react";
import Button from "../button";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import getProducts from "@/api/getProducts";
import PricesHead from "./components/pricesHead";
import PricesRow from "./components/row";
import PricesPagination from "./components/pricesPagination";
import BigerSpinner from "../spinner/bigerSpinner";
import { PricesPageContext } from "@/context/pricesPageContext";
import { IEditProductPriceAndQuantityData } from "@/types/editPrice&quantity";
import { queryClient } from "@/lib/raectQuery";
import editProductPriceAndQuantity from "@/api/editProductPriceAndQuantity";
import { useToast } from "../ui/use-toast";

const PricesTable = () => {
  const { page } = useContext(PricesPageContext);
  const { toast } = useToast();
  const [productsInfo, setProductInfo] = useState<
    IEditProductPriceAndQuantityData[] | []
  >([]);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["prices", page],
    queryFn: () => getProducts(page, "-createdAt"),
  });

  const { mutate: editMutate, isPending } = useMutation({
    mutationFn: (value: IEditProductPriceAndQuantityData[]) =>
      editProductPriceAndQuantity(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast({
        title: "✅محصول با موفقیت ویرایش شد",
      });
    },
    onError: (error) => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  const saveHandler = () => {
    if (productsInfo.length < 1) {
      toast({
        title: "❌هیچ محصولی ویرایش نشده",
      });
      return;
    }
    editMutate(productsInfo);
  };

  return (
    <div className="">
      <div className="flex justify-between md:px-4">
        <div>
          <p className="text-xl md:text-2xl">موجودی و قیمت ها</p>
        </div>
        <div className="">
          <Button
            onClick={saveHandler}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            ذخیره
          </Button>
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-md border">
        <Table className="table-fixed border-collapse">
          <TableHeader>
            <PricesHead />
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data &&
              data.data.products?.map((item) => (
                <PricesRow
                  key={item._id}
                  data={item}
                  set={setProductInfo}
                  get={productsInfo}
                  pend={isPending}
                />
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
