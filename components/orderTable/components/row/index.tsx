import Button from "@/components/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IOrdersEntity } from "@/types/getOrdersRes";
import React from "react";
import UserOrder from "../user";

const Row = ({ data }: { data: IOrdersEntity }) => {
  return (
    <TableRow>
      <TableCell>
        <UserOrder id={data.user} />
      </TableCell>
      <TableCell>{data.totalPrice}</TableCell>
      <TableCell>{new Date(data.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="flex justify-center">
        <Button className="underline">بررسی سفارش</Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
