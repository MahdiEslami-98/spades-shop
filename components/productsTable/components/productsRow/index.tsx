import Button from "@/components/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductsEntity } from "@/types/getProductsRes";
import Link from "next/link";
import React from "react";
import GetCategory from "../category";

const ProductsRow = ({ data }: { data: ProductsEntity }) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={data.thumbnail}
          alt={data.brand}
          className="w-10 object-cover object-center"
        />
      </TableCell>
      <TableCell>
        <Link className="hover:underline" href={`/product/${data._id}`}>
          {data.name}
        </Link>
      </TableCell>
      <TableCell>
        <GetCategory id={data.category} />
      </TableCell>
      <TableCell className="flex items-center justify-center gap-x-2">
        <Button className="rounded-md bg-yellow-400 px-2 py-1">ویرایش</Button>
        <Button className="rounded-md bg-red-400 px-2 py-1">حذف</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductsRow;
