"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./header";

const MainLayout = () => {
  const pathName = usePathname();
  if (pathName.includes("login") || pathName.includes("dashboard"))
    return <></>;

  return (
    <>
      <Header></Header>
    </>
  );
};

export default MainLayout;
