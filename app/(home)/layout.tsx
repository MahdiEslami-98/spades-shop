import MainLayout from "@/components/mainLayout";
import React, { ReactNode } from "react";

const HomeLayput = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainLayout />
      {children}
    </>
  );
};

export default HomeLayput;
