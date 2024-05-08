import { ICartItem } from "@/store/cart-store";

const sumProductPricesInCart = (arr: ICartItem[]) => {
  return arr.reduce((total, item) => item.price * item.cartQuantity + total, 0);
};

export default sumProductPricesInCart;
