import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z.string(
  z
    .any()
    .refine((file) => file?.length > 0, {
      message: "تصویری برای افزودن انتخاب کنید",
    })
    .refine((file) => file?.size <= 2000000, {
      message: "حجم تصویر باید کمتر از 2 مگابایت باشد",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "فرمت تصویر مجاز نیست",
    }),
);

const addProductSchema = z.object({
  category: z.string({ required_error: "دسته بندی را انتخاب کنید" }).min(1, {
    message: "دسته بندی را انتخاب کنید",
  }),
  subcategory: z
    .string({ required_error: "زیر دسته بندی را انتخاب کنید" })
    .min(1, {
      message: "زیر دسته بندی را انتخاب کنید",
    }),
  name: z
    .string({ required_error: "نام کالا را وارد کنید" })
    .min(3, { message: "نام کالا باید بیشتر از 3 حرف باشد" })
    .max(100, { message: "نام کالا باید کمتر از 100 حرف باشد" }),
  price: z
    .string({ required_error: "قیمت کالا را وارد کنید" })
    .min(5, { message: "قیمت کالا باید بیشتر از 5 رقم باشد" })
    .max(30, { message: "قیمت کالا باید کمتر از 30 رقم باشد" }),
  quantity: z
    .string({ required_error: "تعداد کالا را وارد کنید" })
    .min(1, { message: "تعداد کالا باید بیشتر از 1 باشد" }),
  brand: z
    .string({ required_error: "برند کالا را وارد کنید" })
    .min(3, { message: "برند کالا باید بیشتر از 3 حرف باشد" })
    .max(30, { message: "برند کالا باید کمتر از 30 حرف باشد" }),
  description: z
    .string({ required_error: "توضیحات کالا را وارد کنید" })
    .min(10, { message: "توضیحات کالا باید بیشتر از 10 حرف باشد" })
    .max(2000, { message: "توضیحات کالا باید کمتر از 2000 حرف باشد" }),
  thumbnail: z
    .instanceof(File)
    .refine(
      (file) => file.size < 2 * 1024 * 1024,
      "حجم تصویر باید کمتر از 2MB باشد",
    ),
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 2 * 1024 * 1024,
          "حجم تصویر باید کمتر از 2MB باشد",
        ),
    )
    .min(1, "حداقل یک تصویر باید انتخاب شود")
    .refine(
      (files) => files.every((file) => file.size < 2 * 1024 * 1024),
      "حجم تصویر باید کمتر از 2MB باشد",
    ),
});

export default addProductSchema;
export type AddProductFormType = z.infer<typeof addProductSchema>;
