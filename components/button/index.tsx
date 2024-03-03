import { ButtonHTMLAttributes, LegacyRef, forwardRef } from "react";

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: LegacyRef<HTMLButtonElement>,
) => {
  return <button {...props} ref={ref}></button>;
};

export default forwardRef(Button);
