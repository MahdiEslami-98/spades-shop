"use client";
import getAllCategory from "@/api/getAllCategory";
import { ICategoryEntity } from "@/types/getAllCategoryRes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CatOption = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["categoryOpt"],
    queryFn: () => getAllCategory(),
  });
  return (
    <>
      {isSuccess &&
        data &&
        data.data.categories.map((cat: ICategoryEntity) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
    </>
  );
};

export default CatOption;
