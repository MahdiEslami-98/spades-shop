"use client";

import getSubcategoryByCategory from "@/api/getSubcategoryByCategory";
import { ISubcategory } from "@/types/getAllSubcategoryRes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SubOption = ({ value }: { value: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["subCategoryOpt", value],
    queryFn: () => getSubcategoryByCategory(value),
  });
  return (
    <>
      {isSuccess &&
        data &&
        data.data.subcategories.map((sub: ISubcategory) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
    </>
  );
};

export default SubOption;
