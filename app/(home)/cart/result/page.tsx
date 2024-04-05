"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheck, FaX } from "react-icons/fa6";

const ResultPage = () => {
  const param = useSearchParams();
  const status = param.get("payment");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  if (!status) {
    router.push("/");
    return <></>;
  }

  if (status === "success") {
    return (
      <div className="container mx-auto">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div>
            <FaCheck className="text-7xl text-green-500 md:text-9xl" />
          </div>
          <p className="w-1/2 text-lg font-bold md:text-xl lg:w-1/3">
            با تشکر از خرید شما، سفارش شما با موفقیت ثبت شد و به زودی ارسال
            خواهد شد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div>
          <FaX className="text-7xl text-red-500 md:text-9xl" />
        </div>
        <p className="w-1/2 text-lg font-bold md:text-xl lg:w-1/3">
          پرداخت ناموفق بود. لطفا مجددا تلاش کنید. سفارش شما با موفقیت ثبت نشد
        </p>
      </div>
    </div>
  );
};

export default ResultPage;
