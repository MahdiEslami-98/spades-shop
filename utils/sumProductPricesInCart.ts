import { ICartItem } from "@/store/cart-store";

const sumProductPricesInCart = (arr: ICartItem[]) => {
  return arr
    .reduce((total, item) => item.price * item.cartQuantity + total, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default sumProductPricesInCart;
