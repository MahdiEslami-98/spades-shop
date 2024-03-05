"use client";
import React from "react";
import Button from "../button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import logoutService from "@/api/logOutService";

const LogoutButton = () => {
  const router = useRouter();
  const { mutate: logoutMutate } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      sessionStorage.clear();
      localStorage.removeItem("user_info");
      router.push("/login");
    },
  });
  const logoutHandler = () => {
    logoutMutate();
  };
  return (
    <Button
      onClick={logoutHandler}
      className="flex items-center gap-x-4 rounded-3xl bg-black px-4 py-2 text-sm text-white"
    >
      <FaArrowRightFromBracket />
      <span>خروج</span>
    </Button>
  );
};

export default LogoutButton;
