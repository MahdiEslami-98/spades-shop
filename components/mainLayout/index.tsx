"use client";

import { usePathname } from "next/navigation";
import React from "react";

const MainLayout = () => {
  const pathName = usePathname();
  if (pathName.includes("login") || pathName.includes("dashboard"))
    return <></>;
  return <div>MainLayout</div>;
};

export default MainLayout;
