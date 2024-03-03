import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const logOutHandler = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
  };
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between border-b py-2">
        <div className="flex items-center">
          <Logo />
          <p className="text-3xl font-semibold md:text-4xl">اسپادز</p>
        </div>
        <div className="flex gap-x-2">
          <Link
            href={"/"}
            className="rounded-2xl bg-black px-4 py-2 text-white"
          >
            بازگشت به صفحه اصلی
          </Link>
          <button
            onClick={logOutHandler}
            className="rounded-2xl bg-black px-4 py-2 text-white"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default layout;
