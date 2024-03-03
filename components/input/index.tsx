import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";

const Input = (
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: LegacyRef<HTMLInputElement>,
) => {
  return <input {...props} ref={ref} />;
};

export default forwardRef(Input);
