import { TableHead, TableRow } from "@/components/ui/table";
import React from "react";

const Head = () => {
  return (
    <TableRow>
      <TableHead className="px-1 text-right">نام کاربر</TableHead>
      <TableHead className="px-1 text-right">مجموع مبلغ</TableHead>
      <TableHead className="px-1 text-right">زمان ثبت</TableHead>
      <TableHead className="px-1 text-right">وضعیت</TableHead>
      <TableHead className="px-1 text-center">بررسی</TableHead>
    </TableRow>
  );
};

export default Head;
