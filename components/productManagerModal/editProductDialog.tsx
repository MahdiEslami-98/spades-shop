import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../button";
import { Controller, useForm } from "react-hook-form";
import Input from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import CatOption from "../categoryOption";
import SubOption from "../subCategoryOption";
import { useMutation, useQuery } from "@tanstack/react-query";
import getProductById from "@/api/getProductById";
import BigerSpinner from "../spinner/bigerSpinner";
import editProductSchema, {
  EditProductFormType,
} from "@/utils/validations/editProductForm";
import editProduct from "@/api/editProduct";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/lib/raectQuery";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { modules } from "@/utils/QuillToolbar";

const EditProductDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
  } = useForm<EditProductFormType>({
    mode: "onChange",
    resolver: zodResolver(editProductSchema),
  });

  const categoryValue = watch("category");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["productDialog", id],
    queryFn: () => getProductById(id),
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: (value: FormData) => editProduct(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mProducts"] });
      toast({
        title: "✅محصول با موفقیت ویرایش شد",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "❌مشکلی پیش آمده",
        description: error.message,
      });
    },
  });

  const submitDialog = (data: EditProductFormType) => {
    const editFormData = new FormData();

    editFormData.append("name", data.name);
    editFormData.append("price", data.price);
    editFormData.append("category", data.category);
    editFormData.append("subcategory", data.subcategory);
    editFormData.append("quantity", data.quantity);
    if (data.images) {
      data.images.forEach((img: File) => {
        editFormData.append("images", img);
      });
    }
    if (data.thumbnail) {
      editFormData.append("thumbnail", data.thumbnail);
    }
    editFormData.append("brand", data.brand);
    editFormData.append("description", data.description);

    editMutate(editFormData);
  };

  useEffect(() => {
    if (data) {
      setValue("brand", data.data.product.brand);
      setValue("description", data.data.product.description);
      setValue("name", data.data.product.name);
      setValue("price", String(data.data.product.price));
      setValue("quantity", String(data.data.product.quantity));
      setValue("category", data.data.product.category._id);
      setValue("subcategory", data.data.product.subcategory._id);
    }
  }, [data, setValue]);

  useEffect(() => {
    setCategory(categoryValue);
  }, [categoryValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"rounded-md bg-yellow-400 px-2 py-1 text-white"}>
          ویرایش
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rtl:space-x-reverse">
        <DialogHeader>
          <DialogTitle className="text-right">ویرایش کالا</DialogTitle>
        </DialogHeader>
        {isLoading && <BigerSpinner />}
        {isSuccess && data && (
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
                    <input
                      multiple
                      type="file"
                      id="image"
                      onChange={(e) => {
                        const file = Array.from(e.target.files || []);
                        field.onChange(file);
                      }}
                      className="rounded-md border border-black"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="thumbnail">thumbnail :</label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="thumbnail"
                      type="file"
                      className="rounded-md border border-black"
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
                ویرایش
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
