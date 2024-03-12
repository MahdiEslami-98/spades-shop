import Button from "@/components/button";
import { TableCell } from "@/components/ui/table";
import { ProductsTablePageContext } from "@/context/productTablePageContext";
import React, { useContext } from "react";

const Btn = ({ i }: { i: number }) => {
  const { page, setPage } = useContext(ProductsTablePageContext);
  return (
    <Button
      className={
        "rounded-md border border-black px-2 py-1 " +
        (i === page ? "bg-black text-white" : "bg-white text-black")
      }
      onClick={() => setPage(i)}
    >
      {i}
    </Button>
  );
};

const Dots = () => {
  return <span className="rounded-md px-2 py-1">...</span>;
};

const ProductPagination = ({ total }: { total: number }) => {
  const { page, setPage } = useContext(ProductsTablePageContext);
  const btns: JSX.Element[] = [];

  if (total < 6) {
    for (let i = 1; i <= total; i++) {
      btns.push(<Btn i={i} key={i} />);
    }
  } else if (total >= 6) {
    btns.push(<Btn i={1} key={1} />);
    if (page > 3) {
      btns.push(<Dots key={"a"} />);
    }
    if (page === total) {
      btns.push(<Btn i={page - 2} key={2} />);
    }
    if (page > 2) {
      btns.push(<Btn i={page - 1} key={3} />);
    }
    if (page != 1 && page != total) {
      btns.push(<Btn i={page} key={4} />);
    }
    if (page < total - 1) {
      btns.push(<Btn i={page + 1} key={5} />);
    }
    if (page === 1) {
      btns.push(<Btn i={page + 2} key={6} />);
    }
    if (page < total - 2) {
      btns.push(<Dots key={"b"} />);
    }
    btns.push(<Btn i={total} key={7} />);
  }

  const nextPageHandler = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };
  const pervPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <TableCell colSpan={4}>
      <div className="-my-1 flex flex-row-reverse items-center justify-start gap-x-2">
        <Button
          className="rounded-md border border-black px-2 py-1"
          onClick={pervPageHandler}
        >
          قبلی
        </Button>
        {btns.length !== 0 && btns}
        <Button
          className="rounded-md border border-black px-2 py-1"
          onClick={nextPageHandler}
        >
          بعدی
        </Button>
      </div>
    </TableCell>
  );
};

export default ProductPagination;
