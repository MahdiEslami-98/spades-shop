import { TableHead, TableRow } from "@/components/ui/table";
import React from "react";

const PricesHead = () => {
  return (
    <TableRow>
      <TableHead colSpan={2} className="text-right">
        نام محصول
      </TableHead>
      <TableHead className="text-right">قیمت</TableHead>
      <TableHead className="text-right">موجودی</TableHead>
    </TableRow>
  );
};

export default PricesHead;
