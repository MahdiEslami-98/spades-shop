"use client";

import loginService from "@/api/loginServices";
import Button from "@/components/button";
import Input from "@/components/input";
import loginFormSchema, {
  LoginFormType,
} from "@/utils/validations/loginFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/spinner";
import getAccessToken from "@/api/getAccessToken";
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (value: LoginFormType) => loginService(value),
    onSuccess(data) {
      if (data.status === "success") {
        const token = data.token;
        const user = data?.data.user;
        sessionStorage.setItem("access_token", token.accessToken);
        sessionStorage.setItem("refresh_token", token.refreshToken);
        sessionStorage.setItem("user_role", user.role);
        localStorage.setItem("user_info", JSON.stringify(user));
        Cookies.set("access_token", token.accessToken);
        Cookies.set("refresh_token", token.refreshToken);
        Cookies.set("user_role", user.role);
        if (user.role === "ADMIN") {
          router.push("/dashboard");
          toast({
            title: "✅ورود با موفقیت انجام شد",
            description: "به پنل مدیریت خوش امدید",
          });
        } else {
          router.push("/");
          toast({
            title: "✅ورود با موفقیت انجام شد",
            description: "به فروشگاه خوش امدید",
          });
        }
      }
    },
    onError() {
      toast({
        title: "❌نام کاربری یا رمز عبور اشتباه است",
      });
    },
  });

  useEffect(() => {
    document.title = "ورود به حساب کاربری";
    const token = sessionStorage.getItem("refresh_token");
    const userRole = sessionStorage.getItem("user_role");
    if (token && userRole === "ADMIN") {
      getAccessToken(token).then((res) => {
        if (res?.status === "success") {
          sessionStorage.setItem("access_token", res.token.accessToken);
          router.push("/dashboard");
        }
      });
    }
  }, []);

  const loginFormSubmit = (value: LoginFormType) => {
    loginMutate(value);
  };

  return (
    <form
      className="row-span-2 flex flex-col gap-y-4 px-6 sm:px-8 md:px-12 lg:px-24 xl:px-40"
      onSubmit={handleSubmit(loginFormSubmit)}
    >
      <div>
        <h1 className="text-3xl font-bold">ورود به پنل مدیریت</h1>
      </div>
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
          type="submit"
          className=" flex w-full items-end justify-center gap-x-4 rounded-xl bg-green-500 px-4 py-2 text-white"
        >
          ورود {isPending && <Spinner />}
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
