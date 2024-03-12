import SkeletonPicture from "@/utils/icons/skeletonPicture";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="col-span-12 animate-pulse border hover:z-10 sm:col-span-6 lg:col-span-4">
      <div className="mx-2 my-4 overflow-hidden rounded-md">
        <SkeletonPicture />
      </div>
      <div className="flex flex-col gap-y-4 p-4">
        <p className="h-2 w-full rounded-full bg-gray-300"></p>
        <p className="h-2 w-full rounded-full bg-gray-300"></p>
        <p className="h-2 w-full rounded-full bg-gray-300"></p>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ProductCardSkeleton;
