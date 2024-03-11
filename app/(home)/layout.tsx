import MainLayout from "@/components/mainLayout";
import Link from "next/link";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainLayout />
      <nav className="container mx-auto flex items-center gap-x-4 px-4 py-2 md:px-12">
        <Link href={"/"}>صفحه اصلی </Link>
        <Link href={"/products-category"}>همه محصولات</Link>
        <Link href={"/products-category?category=65e5d4df0260ee7ae2e039fc"}>
          CITIZEN
        </Link>
        <Link href={"/products-category?category=65e5d5360260ee7ae2e03a00"}>
          SEIKO
        </Link>
        <Link href={"/products-category?category=65e5d5770260ee7ae2e03a04"}>
          CASIO
        </Link>
      </nav>
      <div className="border-t border-black"></div>
      {children}
    </>
  );
};

export default HomeLayout;
