import MainLayout from "@/components/mainLayout";
import Link from "next/link";
import React, { ReactNode, Fragment } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default HomeLayout;
