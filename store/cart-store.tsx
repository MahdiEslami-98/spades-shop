import { IProduct } from "@/types/getProductByIdRes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartItem extends IProduct {
  cartQuantity: number;
}

interface ICartStore {
  cart: ICartItem[];
  actions: {
    addToCart: (product: IProduct, quantity: number) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  };
}

const useCartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      cart: [],

      actions: {
        addToCart: (product, quantity) => {
          const alredyExist = get().cart.find(
            (item: ICartItem) => item._id === product._id,
          );

          if (alredyExist) {
            let q: number;
            if (quantity + alredyExist.cartQuantity > product.quantity) {
              q = product.quantity - alredyExist.cartQuantity;
            } else {
              q = quantity;
            }
            set((state) => ({
              cart: state.cart.map((item) => {
                if (item._id === product._id) {
                  return {
                    ...item,
                    cartQuantity: item.cartQuantity + q,
                  };
                }
                return item;
              }),
            }));
          } else {
            set((state) => ({
              cart: [...state.cart, { ...product, cartQuantity: quantity }],
            }));
          }
        },

        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter((item) => item._id !== id),
          })),

        incrementQuantity: (id) => {
          set((state) => ({
            cart: state.cart.map((item) => {
              if (item._id === id && item.cartQuantity < item.quantity) {
                return {
                  ...item,
                  cartQuantity: item.cartQuantity + 1,
                };
              }
              return item;
            }),
          }));
        },

        decrementQuantity: (id) => {
          set((state) => ({
            cart: state.cart.map((item) => {
              if (item._id === id && item.cartQuantity > 1) {
                return {
                  ...item,
                  cartQuantity: item.cartQuantity - 1,
                };
              }
              return item;
            }),
          }));
        },

        clearCart: () => set({ cart: [] }),
      },
    }),
    {
      name: "cart",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key)),
        ) as ICartStore,
    },
  ),
);

export const useCart = () => useCartStore((state) => state.cart);

export const useCartActions = () => useCartStore((state) => state.actions);

export default useCartStore;
