import MainLayout from "@/components/mainLayout";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainLayout />
      {children}
    </>
  );
};

export default HomeLayout;
