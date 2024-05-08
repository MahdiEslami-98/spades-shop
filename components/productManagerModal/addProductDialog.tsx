import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../button";
import { FaPlus } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import Input from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import addProductSchema, {
  AddProductFormType,
} from "@/utils/validations/addProductForm";
import CatOption from "../categoryOption";
import SubOption from "../subCategoryOption";
import { useMutation } from "@tanstack/react-query";
import addProduct from "@/api/addProduct";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/lib/raectQuery";
import ReactQuill from "react-quill";
import { modules } from "@/utils/QuillToolbar";

const AddProductDialog = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<AddProductFormType>({
    mode: "onChange",
    resolver: zodResolver(addProductSchema),
  });

  const catVal = watch("category");

  useEffect(() => {
    setCategory(catVal);
  }, [catVal]);

  const { mutate: addMutate, isPending } = useMutation({
    mutationFn: (value: FormData) => addProduct(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mProducts"] });
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast({
        title: "✅محصول با موفقیت اضافه شد",
      });
      setOpen(false);
      reset();
    },
    onError: (errors) => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  const submitDialog = (data: AddProductFormType) => {
    const myformData = new FormData();

    myformData.append("name", data.name);
    myformData.append("price", data.price);
    myformData.append("category", data.category);
    myformData.append("subcategory", data.subcategory);
    myformData.append("quantity", data.quantity);
    // for (let i of data.images) {
    //   myformData.append("images", i);
    // }
    data.images.forEach((img: File) => {
      myformData.append("images", img);
    });
    myformData.append("thumbnail", data.thumbnail);
    myformData.append("brand", data.brand);
    myformData.append("description", data.description);

    addMutate(myformData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"rounded-md bg-black px-2 py-1 text-white"}>
          <span className="flex items-center gap-x-2 rounded-md bg-black px-2 py-1 text-white">
            <FaPlus />
            افزودن کالا
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rtl:space-x-reverse">
        <DialogHeader>
          <DialogTitle className="text-right">افزودن کالا</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-2"
          onSubmit={handleSubmit(submitDialog)}
        >
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="name">نام کالا :</label>
              <Input
                id="name"
                className="rounded-md border border-black px-4"
                {...register("name")}
              />
              <span className="text-xs text-red-500">
                {errors.name?.message}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="price">قیمت :</label>
              <Input
                type="number"
                id="price"
                className="rounded-md border border-black px-4"
                {...register("price")}
              />
              <span className="text-xs text-red-500">
                {errors.price?.message}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="category">دسته بندی :</label>
              <select
                id="category"
                className="mt-1 w-full rounded-md border border-black px-4"
                {...register("category")}
              >
                <option value="">انتخاب کنید</option>
                <CatOption />
              </select>
              <span className="text-xs text-red-500">
                {errors.category?.message}
              </span>
            </div>
            <div>
              <label htmlFor="sub">زیر دسته بندی :</label>
              <select
                {...register("subcategory")}
                id="sub"
                className="mt-1 w-full rounded-md border border-black px-4"
              >
                <option value="">انتخاب کنید</option>
                <SubOption value={category} />
              </select>
              <span className="text-xs text-red-500">
                {errors.subcategory?.message}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="brand">برند :</label>
              <Input
                {...register("brand")}
                className="mt-1 w-full rounded-md border border-black px-4"
                id="brand"
              />
              <span className="text-xs text-red-500">
                {errors.brand?.message}
              </span>
            </div>
            <div>
              <label htmlFor="quantity">تعداد :</label>
              <Input
                {...register("quantity")}
                type="number"
                className="mt-1 w-full rounded-md border border-black px-4"
                id="quantity"
              />
              <span className="text-xs text-red-500">
                {errors.quantity?.message}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="image">تصویر :</label>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <Input
                    multiple
                    type="file"
                    id="image"
                    className="overflow-hidden rounded-md border border-black text-slate-500 file:ml-4 file:border-0 file:bg-black file:px-3 file:py-1 file:font-medium file:text-white hover:file:bg-gray-800"
                    onChange={(e) => {
                      const file = Array.from(e.target.files || []);
                      field.onChange(file);
                    }}
                  />
                )}
              />
              <span className="text-xs text-red-500">
                {errors.images?.message}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="thumbnail">thumbnail :</label>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    id="thumbnail"
                    className="overflow-hidden rounded-md border border-black text-slate-500 file:ml-4 file:border-0 file:bg-black file:px-3 file:py-1 file:font-medium file:text-white hover:file:bg-gray-800"
                    onChange={(e) => {
                      const file = Array.from(e.target.files || []);
                      field.onChange(file[0]);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">توضیحات :</label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  className="left-to-right max-w-[550px]"
                  modules={modules}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className="text-xs text-red-500">
              {errors.description?.message}
            </span>
          </div>
          <div>
            <Button
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              type="submit"
            >
              افزودن کالا
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
