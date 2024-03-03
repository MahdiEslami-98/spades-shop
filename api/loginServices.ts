"use server";

import { ILoginData, ILoginRes } from "@/types";

const loginService = async (data: ILoginData): Promise<ILoginRes | any> => {
  try {
    const response = await fetch(process.env.BASE_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    return error;
  }
};

export default loginService;
