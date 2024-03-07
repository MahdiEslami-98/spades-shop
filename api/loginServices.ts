import { ILoginData, ILoginRes } from "@/types/login";
import { post } from "./axiosInstance";
import { AxiosError } from "axios";

const loginService = async (data: ILoginData): Promise<ILoginRes | any> => {
  try {
    const response: ILoginRes = await post("/auth/login", data);
    return response;
  } catch (error) {
    console.log((error as AxiosError).message);
  }
};

export default loginService;
