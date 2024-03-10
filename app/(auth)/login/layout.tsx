import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="login">
      <div className="container mx-auto grid h-full w-full grid-cols-1 grid-rows-3 items-center md:grid-cols-2 md:grid-rows-1">
        {children}
        <div className="mx-auto">
          <div className="hidden md:block">
            <div className="flex items-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Logo />
              <span className="text-4xl font-semibold">اسپادز</span>
            </div>
            <p className="pt-2 text-lg font-semibold">
              بهترین فروشگاه آنلاین ساعت
            </p>
          </div>
          <Link
            className="-mt-12 inline-block text-sm font-semibold underline md:mt-8"
            href={"/"}
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
