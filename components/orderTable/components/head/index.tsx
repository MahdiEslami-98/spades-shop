import { TableHead, TableRow } from "@/components/ui/table";
import React from "react";

const Head = () => {
  return (
    <TableRow>
      <TableHead className="text-right">نام کاربر</TableHead>
      <TableHead className="text-right">مجموع مبلغ</TableHead>
      <TableHead className="text-right">زمان ثبت</TableHead>
      <TableHead className="text-center">بررسی</TableHead>
    </TableRow>
  );
};

export default Head;
