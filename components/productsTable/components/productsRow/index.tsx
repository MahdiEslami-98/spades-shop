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
          src={
            "http://localhost:8000/images/products/thumbnails/" + data.thumbnail
          }
          alt={data.brand}
          className="w-20 object-cover object-center"
        />
      </TableCell>
      <TableCell>
        <Link
          className="text-xs hover:underline sm:text-base"
          href={`/product/${data._id}`}
        >
          {data.name}
        </Link>
      </TableCell>
      <TableCell>
        <GetCategory id={data.category} />
      </TableCell>
      <TableCell className="sm:flex sm:items-center sm:justify-center sm:gap-x-2">
        <Button className="mb-2 rounded-md bg-yellow-400 px-2 py-1 sm:mb-0">
          ویرایش
        </Button>
        <Button className="rounded-md bg-red-400 px-2 py-1">حذف</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductsRow;
