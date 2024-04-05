import Button from "@/components/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IOrdersEntity } from "@/types/getOrdersRes";
import React from "react";
import UserOrder from "../user";
import OrderModal from "@/components/orderModal";

const Row = ({ data }: { data: IOrdersEntity }) => {
  return (
    <TableRow>
      <TableCell className="px-1 text-right">
        <UserOrder id={data.user} />
      </TableCell>
      <TableCell className="px-1 text-right">{data.totalPrice}</TableCell>
      <TableCell className="px-1 text-right">
        {new Date(data.createdAt).toLocaleDateString("fa-IR")}
      </TableCell>
      <TableCell className="px-1">
        {data.deliveryStatus ? "تحویل شده" : "در انتظار"}
      </TableCell>
      <TableCell className="px-1 text-center">
        <OrderModal id={data._id} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
