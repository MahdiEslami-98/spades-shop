import Button from "@/components/button";
import Input from "@/components/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductsEntity } from "@/types/getProductsRes";
import Link from "next/link";
import React from "react";

const PricesRow = ({ data }: { data: ProductsEntity }) => {
  return (
    <TableRow>
      <TableCell colSpan={2}>
        <Link href={`/product/${data._id}`} className="hover:underline">
          {data.name}
        </Link>
      </TableCell>
      <TableCell>
        <Button>{data.price}</Button>
        <Input className="hidden" value={data.price} readOnly />
      </TableCell>
      <TableCell>
        <Button>{data.quantity}</Button>
        <Input className="hidden" value={data.quantity} readOnly />
      </TableCell>
    </TableRow>
  );
};

export default PricesRow;
