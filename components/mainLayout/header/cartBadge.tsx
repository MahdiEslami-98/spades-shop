"use client";
import { useCart } from "@/store/cart-store";
import React from "react";

const CartBadge = () => {
  const cart = useCart();
  return (
    <>
      {cart.length > 0 && (
        <span className="absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs">
          {cart.length}
        </span>
      )}
    </>
  );
};

export default CartBadge;
