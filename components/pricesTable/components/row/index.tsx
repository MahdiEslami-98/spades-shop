import Button from "@/components/button";
import Input from "@/components/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { IEditProductPriceAndQuantityData } from "@/types/editPrice&quantity";
import { ProductsEntity } from "@/types/getProductsRes";
import Link from "next/link";
import React, {
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useRef,
} from "react";

const PricesRow = ({
  data,
  set,
  get,
  pend,
}: {
  data: ProductsEntity;
  set: Dispatch<SetStateAction<any>>;
  get: IEditProductPriceAndQuantityData[];
  pend: boolean;
}) => {
  const priceInput = useRef() as RefObject<HTMLInputElement>;
  const quantityInput = useRef() as RefObject<HTMLInputElement>;
  const priceBtn = useRef() as RefObject<HTMLButtonElement>;
  const quantityBtn = useRef() as RefObject<HTMLButtonElement>;

  if (pend) {
    priceInput.current?.classList.add("hidden");
    quantityInput.current?.classList.add("hidden");
    priceBtn.current?.classList.remove("hidden");
    quantityBtn.current?.classList.remove("hidden");
  }

  const priceChangeToInput: MouseEventHandler = (e) => {
    e.currentTarget.classList.add("hidden");
    if (!priceInput.current) return;
    priceInput.current.classList.remove("hidden");
    priceInput.current.focus();
  };

  const quantityChangeToInput: MouseEventHandler = (e) => {
    e.currentTarget.classList.add("hidden");
    if (!quantityInput.current) return;
    quantityInput.current.classList.remove("hidden");
    quantityInput.current.focus();
  };

  const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || +value.length < 5) {
      priceInput.current?.classList.add("bg-red-100");
      if (get.length === 0) return;
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === data._id);
        if (main) {
          return [...prev.filter((item) => item.id !== data._id)];
        }
      });
    } else {
      priceInput.current?.classList.remove("bg-red-100");
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === data._id);
        if (!main) {
          return [...prev, { id: data._id, price: value }];
        } else if (main) {
          return [
            ...prev.filter((item) => item.id !== data._id),
            { ...main, price: value },
          ];
        }
      });
    }
  };
  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || +value < 0) {
      quantityInput.current?.classList.add("bg-red-100");
      if (get.length === 0) return;
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === data._id);
        if (main) {
          return [...prev.filter((item) => item.id !== data._id)];
        }
      });
    } else {
      quantityInput.current?.classList.remove("bg-red-100");
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === data._id);
        if (!main) {
          return [...prev, { id: data._id, quantity: value }];
        } else if (main) {
          return [
            ...prev.filter((item) => item.id !== data._id),
            { ...main, quantity: value },
          ];
        }
      });
    }
  };

  const cancelQuantityInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      quantityInput.current?.classList.add("hidden");
      quantityBtn.current?.classList.remove("hidden");
      e.currentTarget.value = data.quantity.toString();
    }
  };

  const cancelPriceInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      priceBtn.current?.classList.remove("hidden");
      e.currentTarget.classList.add("hidden");
      e.currentTarget.classList.remove("bg-red-100");
      e.currentTarget.value = data.price.toString();
    }
  };

  return (
    <TableRow>
      <TableCell colSpan={4}>
        <Link href={`/product/${data._id}`} className="hover:underline">
          {data.name}
        </Link>
      </TableCell>
      <TableCell>
        <Button
          ref={priceBtn}
          className="pl-4"
          onClick={(e) => priceChangeToInput(e)}
        >
          {data.price}
        </Button>
        <Input
          onChange={priceChange}
          ref={priceInput}
          onKeyDown={(e) => cancelPriceInput(e)}
          type="number"
          className="hidden w-28 rounded-md border border-black px-3"
          defaultValue={data.price}
        />
      </TableCell>
      <TableCell>
        <Button
          ref={quantityBtn}
          className="pl-6"
          onClick={(e) => quantityChangeToInput(e)}
        >
          {data.quantity}
        </Button>
        <Input
          onChange={quantityChange}
          onKeyDown={(e) => cancelQuantityInput(e)}
          ref={quantityInput}
          type="number"
          className="hidden w-20 rounded-md border border-black px-3"
          defaultValue={data.quantity}
        />
      </TableCell>
    </TableRow>
  );
};

export default PricesRow;
