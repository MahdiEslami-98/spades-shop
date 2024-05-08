import { TableCell, TableRow } from "@/components/ui/table";
import { ProductsEntity } from "@/types/getProductsRes";
import Link from "next/link";
import React from "react";
import GetCategory from "../category";
import DeleteModal from "@/components/deleteModal";
import EditProductDialog from "@/components/productManagerModal/editProductDialog";

const ProductsRow = ({ data }: { data: ProductsEntity }) => {
  return (
    <TableRow>
      <TableCell>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
          className="line-clamp-2 text-xs hover:underline sm:text-base"
          href={`/product/${data._id}`}
        >
          {data.name}
        </Link>
      </TableCell>
      <TableCell className="overflow-hidden text-ellipsis text-xs sm:text-base">
        <GetCategory id={data.category} />
      </TableCell>
      <TableCell className="gap-y-2 text-xs sm:flex sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-0 sm:text-sm md:text-base">
        <EditProductDialog id={data._id} />
        <DeleteModal id={data._id} name={data.name} />
      </TableCell>
    </TableRow>
  );
};

export default ProductsRow;
