"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useCart } from "@/store/cart-store";
import isObjectEmpty from "@/utils/isObjectEmpty";
import numberTo3Digit from "@/utils/numberSeperateWith3Digit";
import sumProductPricesInCart from "@/utils/sumProductPricesInCart";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const shippingCost = 100000;

const CheckoutPage = () => {
  const cart = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const minShippingDate = useCallback(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    if (now.getDay() === 5) {
      now.setDate(now.getDate() + 1);
    }
    return new DateObject(now);
  }, []);

  const [dateValue, setDateValue] = useState<Value>(minShippingDate());

  const user =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user_info") || "{}");

  useEffect(() => {
    if (isObjectEmpty(user)) {
      router.push("/login");
    }
  }, []);

  const paymentClickHandler = () => {
    if (isObjectEmpty(user)) {
      router.push("/login");
    }

    if (cart.length === 0) {
      toast({
        title: "سبد خرید شما خالی است",
      });
    }

    if (!dateValue) {
      toast({
        title: "لطفا تاریخ تحویل خود را انتخاب کنید",
      });
    }
    localStorage.setItem(
      "shipping_date",
      JSON.stringify((dateValue as DateObject).toDate()),
    );

    router.push("/payment?status=checkout");
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 justify-center justify-items-center gap-x-8 gap-y-8 py-4 md:gap-y-0">
        <div className="col-span-12 w-full rounded-md border border-black p-4 md:col-span-7 lg:col-span-8">
          <div className="flex flex-col gap-y-2">
            <div className="flex">
              <label htmlFor="name" className="inline-block w-36 font-medium">
                نام :
              </label>
              <Input
                id="name"
                readOnly
                disabled
                value={user.firstname}
                className="w-full max-w-2xl bg-gray-100 px-4 py-1"
              />
            </div>
            <div className="flex">
              <label htmlFor="family" className="inline-block w-36 font-medium">
                نام خانوادگی :
              </label>
              <Input
                id="family"
                readOnly
                disabled
                value={user.lastname}
                className="w-full max-w-2xl bg-gray-100 px-4 py-1"
              />
            </div>
            <div className="flex">
              <label htmlFor="tel" className="inline-block w-36 font-medium">
                شماره تلفن :
              </label>
              <Input
                id="tel"
                readOnly
                disabled
                value={user.phoneNumber}
                className="w-full max-w-2xl bg-gray-100 px-4 py-1"
              />
            </div>
            <div className="flex">
              <label
                htmlFor="address"
                className="inline-block w-36 font-medium"
              >
                آدرس :
              </label>
              <textarea
                id="address"
                readOnly
                disabled
                className="w-full max-w-2xl resize-none bg-gray-100 p-4"
                value={user.address}
                rows={5}
              ></textarea>
            </div>
            <div className="flex">
              <label htmlFor="date" className="inline-block w-36 font-medium">
                تاریخ تحویل :
              </label>
              <DatePicker
                value={dateValue}
                onChange={setDateValue}
                calendar={persian}
                locale={persian_fa}
                minDate={new DateObject({ calendar: persian }).add(1, "day")}
                maxDate={new DateObject({ calendar: persian }).add(10, "day")}
                render={(value, openCalender) => {
                  return (
                    <Button
                      className="flex w-40 items-center justify-between gap-x-8 rounded-sm border border-black px-4 py-1"
                      onClick={openCalender}
                    >
                      {value}
                      <FaCalendarDays />
                    </Button>
                  );
                }}
                calendarPosition="bottom-right"
                mapDays={({ date }) => {
                  if (date.weekDay.index === 6) {
                    return {
                      disabled: true,
                      style: {
                        color: "red",
                      },
                      onClick: () => {
                        toast({
                          title: "خرید شما روزهای جمعه قابل تحویل نیست",
                          variant: "destructive",
                        });
                      },
                    };
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 w-full md:col-span-5 lg:col-span-4">
          <div className="rounded-md border border-black p-4">
            <div className="flex justify-between">
              <p>قیمت محصولات :</p>
              <p>{numberTo3Digit(sumProductPricesInCart(cart))}</p>
            </div>
            <div className="flex justify-between">
              <p>هزینه ارسال :</p>
              <p>{numberTo3Digit(shippingCost)}</p>
            </div>
            <hr className="my-4 bg-black" />
            <div className="flex justify-between">
              <p>قابل پرداخت :</p>
              {cart.length > 0 ? (
                <p>
                  {numberTo3Digit(sumProductPricesInCart(cart) + shippingCost)}
                </p>
              ) : (
                <p>0</p>
              )}
            </div>
            <div className="mt-4 flex items-center text-center">
              <Button
                onClick={paymentClickHandler}
                disabled={cart.length === 0}
                className="w-full rounded-md bg-black px-4 py-2 text-white"
              >
                پرداخت
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href={"/cart"}>ویرایش سبد خرید</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
