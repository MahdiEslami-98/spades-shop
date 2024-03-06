import React from "react";
import Logo from "@/components/logo";
import LogoutButton from "@/components/logoutButton";
import Link from "next/link";
import {
  FaHouse,
  FaReceipt,
  FaCalculator,
  FaCubesStacked,
} from "react-icons/fa6";

const tabs = [
  { title: "سفارش ها", href: "/dashboard", icon: <FaReceipt /> },
  { title: "موجودی و قیمت", href: "/dashboard/prices", icon: <FaCalculator /> },
  { title: "کالاها", href: "/dashboard/allProducts", icon: <FaCubesStacked /> },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto h-full px-4">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b py-2">
          <Link href={"/"} className="flex items-center gap-x-4">
            <Logo />
            <p className="text-3xl font-semibold md:text-4xl">اسپادز</p>
          </Link>
          <div className="flex gap-x-2">
            <Link
              href={"/"}
              className="flex items-center gap-x-4 rounded-3xl bg-black px-4 py-2 text-sm text-white"
            >
              <FaHouse />
              <span className="hidden sm:block">صفحه اصلی</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-12 gap-y-8 px-8 py-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-0">
          <div className="row-span-2 flex gap-x-4 rounded-xl border p-4 sm:gap-x-8 md:gap-x-24 lg:col-span-3 lg:block lg:gap-x-0 xl:col-span-2">
            {tabs.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-2 py-2 text-lg lg:gap-x-4"
              >
                {item.icon}
                <Link className="text-sm font-medium" href={item.href}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="row-span-10 rounded-xl border p-4 lg:col-span-9  xl:col-span-10 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
