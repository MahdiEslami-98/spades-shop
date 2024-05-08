"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";

import React from "react";
import Button from "../button";
import deleteProductById from "@/api/deleteProductById";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/lib/raectQuery";

const DeleteModal = ({ id, name }: { id: string; name: string }) => {
  const { toast } = useToast();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (value: string) => deleteProductById(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mProducts"] });
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast({
        title: "✅محصول با موفقیت حذف شد",
      });
    },
    onError: () => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md bg-red-500 px-3 py-1 text-white">
        حذف
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            آیا مطمئن هستید؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            {name} به طور کامل حذف خواهد شد
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-x-2">
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => deleteMutate(id)}>حذف</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
