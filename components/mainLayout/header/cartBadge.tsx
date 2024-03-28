"use client";
import { useCart } from "@/store/cart-store";
import React from "react";

const CartBadge = () => {
  const cart = useCart();
  return (
    <>
      {cart.length > 0 && (
        <span className="absolute -right-1 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs">
          {cart.length}
        </span>
      )}
    </>
  );
};

export default CartBadge;
