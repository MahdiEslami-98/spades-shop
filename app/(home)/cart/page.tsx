"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useCart, useCartActions } from "@/store/cart-store";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import sumProductPricesInCart from "@/utils/sumProductPricesInCart";

const CartPage = () => {
  const cart = useCart();
  const { incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
    useCartActions();
  return (
    <div className="container mx-auto h-4/5 px-6 py-4">
      <div className="grid grid-cols-12 gap-x-6 pb-4">
        <div className="col-span-12 mb-20 rounded-md border border-black p-4 md:col-span-8 md:mb-0">
          <div className="flex items-center justify-between pb-2">
            <div>
              <p className="font-medium">سبد خرید شما</p>
              {cart.length > 0 && (
                <p className="text-sm text-gray-400">{cart.length} کالا</p>
              )}
            </div>
            <div>
              {cart.length > 0 && (
                <Button
                  onClick={clearCart}
                  className="flex items-center gap-x-2"
                >
                  <FaRegTrashCan />
                  حذف همه
                </Button>
              )}
            </div>
          </div>
          {!cart.length && (
            <div className="text-center">
              <Image
                className="mx-auto"
                src="/empty-cart.svg"
                alt="empty-cart"
                width={300}
                height={300}
              />
              <p>سبد خرید شما خالی است</p>
            </div>
          )}
          {cart.length > 0 &&
            cart.map((item) => (
              <div
                key={item._id}
                className="flex border-t border-black py-3 text-sm md:px-2 lg:text-base"
              >
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={process.env.PRODUCT_THUMB + item.thumbnail}
                    alt={item.name}
                    className="w-16 sm:w-20 md:w-32"
                  />
                </div>
                <div className="flex w-full flex-col gap-y-2">
                  <Link
                    href={`/product/${item._id}`}
                    className="mt-2 line-clamp-2 inline-block h-10 hover:underline sm:h-fit"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-x-6">
                    <p>قیمت:</p>
                    <p className="font-medium">
                      {(item.price * item.cartQuantity)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center gap-x-2 sm:flex-row">
                      <p>تعداد:</p>
                      <div className="overflow-hidden rounded-md">
                        <Button
                          className={
                            "border border-black bg-black px-2 py-1 text-white " +
                            (item.cartQuantity === item.quantity
                              ? "opacity-20"
                              : "")
                          }
                          onClick={() => incrementQuantity(item._id)}
                          disabled={item.cartQuantity === item.quantity}
                        >
                          +
                        </Button>
                        <span className="inline-block w-7 border border-black py-1 text-center">
                          {item.cartQuantity}
                        </span>
                        <Button
                          className={
                            "border border-black bg-black px-2 py-1 text-white " +
                            (item.cartQuantity === 1 ? "opacity-20" : "")
                          }
                          onClick={() => decrementQuantity(item._id)}
                          disabled={item.cartQuantity === 1}
                        >
                          -
                        </Button>
                      </div>
                      <p className="text-gray-400">
                        حداکثر: {item.quantity} عدد
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={() => removeFromCart(item._id)}
                        className="flex items-center gap-x-2 rounded-md bg-black px-4 py-2 text-white"
                      >
                        <FaRegTrashCan />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 col-span-4 md:sticky md:top-12">
          <div className="shadow- flex items-center justify-between border-t border-black bg-white p-4 shadow-med md:block md:rounded-md md:border md:p-6 md:shadow-none">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500">
                مبلغ قابل پرداخت
              </p>
              <p className="text-sm md:text-base">
                {sumProductPricesInCart(cart)}
                <span className="pr-2">تومان</span>
              </p>
            </div>
            {cart.length > 0 && (
              <div className="md:pt-4">
                <Link
                  href={"/cart/checkout"}
                  className="inline-block rounded-md bg-black px-4 py-2 text-center text-white md:w-full"
                >
                  تایید و پرداخت
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
