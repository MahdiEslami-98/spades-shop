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
  useEffect,
  useRef,
  useState,
} from "react";

const findMain = (data: IEditProductPriceAndQuantityData[], id: string) => {
  return data.find((item) => item.id === id);
};

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
  const [showInput, setShowInput] = useState({ price: false, quantity: false });
  const [showBtn, setShowBtn] = useState({ price: true, quantity: true });
  const [showError, setShowError] = useState({ price: false, quantity: false });
  const [isChange, setIsChange] = useState({ price: false, quantity: false });
  const priceInput = useRef() as RefObject<HTMLInputElement>;
  const quantityInput = useRef() as RefObject<HTMLInputElement>;
  const priceBtn = useRef() as RefObject<HTMLButtonElement>;
  const quantityBtn = useRef() as RefObject<HTMLButtonElement>;

  const priceChangeToInput: MouseEventHandler = () => {
    setShowInput((prev) => ({ ...prev, price: true }));
    setShowBtn((prev) => ({ ...prev, price: false }));
    priceInput.current?.focus();
  };

  const quantityChangeToInput: MouseEventHandler = () => {
    setShowInput((prev) => ({ ...prev, quantity: true }));
    setShowBtn((prev) => ({ ...prev, quantity: false }));
    quantityInput.current?.focus();
  };

  const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || +value.length < 5) {
      setShowError((prev) => ({ ...prev, price: true }));
      if (get.length === 0) return;
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = findMain(prev, data._id);
        if (main) {
          return [...prev.filter((item) => item.id !== data._id)];
        }
      });
    } else {
      setShowError((prev) => ({ ...prev, price: false }));
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = findMain(prev, data._id);
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
      setShowError((prev) => ({ ...prev, quantity: true }));
      if (get.length === 0) return;
      set((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === data._id);
        if (main) {
          return [...prev.filter((item) => item.id !== data._id)];
        }
      });
    } else {
      setShowError((prev) => ({ ...prev, quantity: false }));
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
      setShowInput((prev) => ({ ...prev, quantity: false }));
      setShowBtn((prev) => ({ ...prev, quantity: true }));
      setShowError((prev) => ({ ...prev, quantity: false }));
      e.currentTarget.value = data.quantity.toString();
    }
  };

  const cancelPriceInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      setShowBtn((prev) => ({ ...prev, price: true }));
      setShowInput((prev) => ({ ...prev, price: false }));
      setShowError((prev) => ({ ...prev, price: false }));
      e.currentTarget.value = data.price.toString();
    }
  };

  useEffect(() => {
    const main = findMain(get, data._id);
    if (main) {
      main.price && setIsChange((prev) => ({ ...prev, price: true }));
      main.quantity && setIsChange((prev) => ({ ...prev, quantity: true }));
    } else {
      setIsChange({ price: false, quantity: false });
    }
  }, [get]);

  useEffect(() => {
    setShowInput({ price: false, quantity: false });
    setShowBtn({ price: true, quantity: true });
  }, [pend]);

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
          className={`rounded-md pl-4 ${showBtn.price ? "" : "hidden"} ${isChange.price && "bg-green-100"} ${showError.price && "bg-red-100"}`}
          onClick={priceChangeToInput}
        >
          {data.price}
        </Button>
        <Input
          onChange={priceChange}
          ref={priceInput}
          onKeyDown={(e) => cancelPriceInput(e)}
          type="number"
          className={`w-28 rounded-md border border-black px-3
            ${showInput.price ? "" : " hidden"} ${isChange.price && "bg-green-100"} ${showError.price && "bg-red-100"}`}
          defaultValue={data.price}
        />
      </TableCell>
      <TableCell>
        <Button
          ref={quantityBtn}
          className={`rounded-md pl-6 ${showBtn.quantity ? "" : "hidden"} ${isChange.quantity && "bg-green-100"} ${showError.quantity && "bg-red-100"}`}
          onClick={quantityChangeToInput}
        >
          {data.quantity}
        </Button>
        <Input
          onChange={quantityChange}
          onKeyDown={(e) => cancelQuantityInput(e)}
          ref={quantityInput}
          type="number"
          className={`w-20 rounded-md border border-black px-3 ${showInput.quantity ? "" : "hidden"} ${isChange.quantity && "bg-green-100"} ${showError.quantity && "bg-red-100"}`}
          defaultValue={data.quantity}
        />
      </TableCell>
    </TableRow>
  );
};

export default PricesRow;
