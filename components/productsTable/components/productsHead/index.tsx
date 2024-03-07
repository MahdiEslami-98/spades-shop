import { TableHead, TableRow } from "@/components/ui/table";
import React from "react";

const ProductsHead = () => {
  return (
    <TableRow>
      <TableHead className="text-center">تصویر</TableHead>
      <TableHead className="text-right">نام محصول</TableHead>
      <TableHead className="text-right">دسته بندی</TableHead>
      <TableHead className="text-center">عملیات</TableHead>
    </TableRow>
  );
};

export default ProductsHead;
