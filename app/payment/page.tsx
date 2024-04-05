"use client";
import addOrder, { IAddOrderReq } from "@/api/addOrder";
import Button from "@/components/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart, useCartActions } from "@/store/cart-store";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaymentPage = () => {
  const param = useSearchParams();
  const router = useRouter();
  const cart = useCart();
  const { clearCart } = useCartActions();
  const { toast } = useToast();

  const date =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("shipping_date") || "false");

  const user =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user_info") || "");

  const { mutate: payMutate } = useMutation({
    mutationFn: (value: IAddOrderReq) => addOrder(value),
    onSuccess: () => {
      toast({
        title: "✅سفارش شما با موفقیت ثبت شد",
      });
      clearCart();
      router.push("/cart/result?payment=success");
    },
    onError: (error) => {
      toast({
        title: "خطای سرور",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
      });
      router.push("/cart/result?payment=fail");
    },
  });

  const status = param.get("status");

  if (!status || status !== "checkout") {
    router.push("/");
  }

  const payHandler = () => {
    const data: IAddOrderReq = {
      user: user._id,
      products: cart.map((item) => {
        return {
          product: item._id,
          count: item.cartQuantity,
        };
      }),
      deliveryStatus: false,
      deliveryDate: date,
    };

    payMutate(data);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex w-full justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sepehrpay-gateway-preview1.png"
          alt="sepehrpay"
          className="h-[620px] w-full"
        />
      </div>
      <div className="flex justify-center gap-x-8 py-4">
        <Button
          onClick={payHandler}
          className="rounded-xl bg-emerald-400 px-40 py-3 text-xl font-semibold text-white"
        >
          پرداخت
        </Button>
        <Link
          href={"/cart/result?payment=fail"}
          className="rounded-xl bg-yellow-400 px-20 py-3 text-xl font-semibold text-white"
        >
          انصراف
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
