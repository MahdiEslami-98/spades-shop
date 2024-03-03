"use client";

import loginService from "@/api/loginServices";
import Button from "@/components/button";
import Input from "@/components/input";
import loginFormSchema, {
  LoginFormType,
} from "@/utils/validations/loginFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { ILoginRes } from "@/types";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: loginMutate, isSuccess } = useMutation({
    mutationFn: (value: LoginFormType) => loginService(value),
    onSuccess(data: ILoginRes) {
      if (data.status === "success") {
        const token = data.token;
        const user = data?.data.user;
        sessionStorage.set("access_token", token.accessToken);
        sessionStorage.set("refresh_token", token.refreshToken);
        sessionStorage.set("user_role", user.role);
        localStorage.setItem("user_info", JSON.stringify(user));
        if (user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else if (data.status === "fail") {
      }
    },
  });

  const loginFormSubmit = (value: LoginFormType) => {
    loginMutate(value);
  };

  return (
    <>
      <form
        className="flex flex-col gap-y-4 px-6 sm:px-8 md:px-12 lg:px-24 xl:px-40"
        onSubmit={handleSubmit(loginFormSubmit)}
      >
        <h1 className="text-3xl font-bold">ورود به پنل مدیریت</h1>
        <div className="mb-4 w-full">
          <Input
            placeholder="نام کاربری"
            type="text"
            className="w-full rounded-xl bg-black/30 px-4 py-2 outline-0 placeholder:text-slate-800"
            {...register("username")}
          />
          <p
            className={
              "pr-4 pt-1 text-sm text-red-500 " +
              (errors.username?.message ? "visible" : "invisible")
            }
          >
            {errors.username?.message} <span className="invisible">a</span>
          </p>
        </div>
        <div className="mb-4">
          <Input
            placeholder="رمز عبور"
            type="password"
            className="w-full rounded-xl bg-black/30 px-4 py-2 outline-0 placeholder:text-slate-800"
            {...register("password")}
          />
          <p
            className={
              "pr-4 pt-1 text-sm text-red-500 " +
              (errors.password?.message ? "visible" : "invisible")
            }
          >
            {errors.password?.message} <span className="invisible">a</span>
          </p>
        </div>
        <div>
          <Button
            value={"ورود"}
            type="submit"
            className="w-full rounded-xl bg-green-500 px-4 py-2"
          />
        </div>
      </form>
      <div className="mx-auto hidden md:block">
        <div className="flex items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Spades.svg" alt="" className="w-14" />
          <span className="text-4xl font-semibold">اسپادز</span>
        </div>
        <p className="pt-2 text-lg font-semibold">بهترین فروشگاه آنلاین ساعت</p>
      </div>
    </>
  );
};

export default LoginPage;
