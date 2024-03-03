"use server";

import { LoginFormType } from "@/utils/validations/loginFormValidation";

const loginService = async (data: LoginFormType) => {
  try {
    const response = await fetch(process.env.BASE_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== "success") throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default loginService;
