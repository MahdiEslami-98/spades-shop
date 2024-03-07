"use client";
import getCategoryById from "@/api/getCategoryById";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GetCategory = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
  return isSuccess && data && <span>{data.data.category.name}</span>;
};

export default GetCategory;
