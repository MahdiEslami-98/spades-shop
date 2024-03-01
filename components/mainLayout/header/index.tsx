import Link from "next/link";
import React from "react";
import { FaCartShopping, FaUserGear } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="grid w-full grid-cols-2 items-center  py-2">
          <div className="flex items-center ">
            <Link href={"/"}>
              <div className="flex items-center">
                <div className=" w-14">
                  {/*eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Spades.svg" alt="" />
                </div>
                <div className="mr-2">
                  <p className="text-3xl font-semibold md:text-5xl">اسپادز</p>
                  <p className="hidden pt-2 text-sm sm:block md:text-base">
                    فروشگاه آنلاین ساعت
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-end gap-x-1">
            <Link
              href={"/cart"}
              className="relative flex items-center gap-x-2 rounded-3xl bg-black px-4 py-3 text-white"
            >
              <FaCartShopping />
              <span className="hidden sm:block">سبد خرید</span>
              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-xs">
                5
              </span>
            </Link>
            <Link
              className="flex items-center gap-x-2 rounded-3xl bg-black px-4 py-3 text-white"
              href={"/login"}
            >
              <FaUserGear />
              <span className="hidden sm:block">پنل مدیریت</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
