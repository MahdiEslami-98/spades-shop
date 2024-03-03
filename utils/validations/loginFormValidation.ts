import * as z from "zod";
const loginFormSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری را وارد کنید" })
    .min(3, { message: "نام کاربری باید بیشتر از 3 حرف باشد" })
    .max(30, { message: "نام کاربری باید کمتر از 30 حرف باشد" }),
  password: z
    .string({ required_error: "رمز عبور را وارد کنید" })
    .min(8, { message: "رمز عبور باید بیشتر از 8 حرف باشد" })
    .max(30),
});

export default loginFormSchema;
export type LoginFormType = z.infer<typeof loginFormSchema>;
