import { ProductsPaginationContext } from "@/context/productsPaginationContext";
import Link from "next/link";
import React, { useContext } from "react";

const ProductsPagination = ({
  total,
  params,
}: {
  total: number;
  params: URLSearchParams;
}) => {
  const { page, setPage } = useContext(ProductsPaginationContext);
  const btns: JSX.Element[] = [];

  const p = params.get("category")?.toString();
  let par = "";

  if (p) {
    par = `category=${p}&`;
    setPage(1);
  }

  const Btn = ({ i }: { i: number }) => {
    const { page, setPage } = useContext(ProductsPaginationContext);
    return (
      <Link
        href={`/products-category?${par}page=${i}`}
        className={
          "rounded-md border border-black px-2 py-1 " +
          (i === page ? "bg-black text-white" : "bg-white text-black")
        }
        onClick={() => setPage(i)}
      >
        {i}
      </Link>
    );
  };

  const Dots = () => {
    return <span className="rounded-md px-2 py-1">...</span>;
  };

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

  return (
    <div className="-my-1 flex flex-row-reverse items-center justify-center gap-x-2 py-4">
      {btns.length !== 0 && btns}
    </div>
  );
};

export default ProductsPagination;
