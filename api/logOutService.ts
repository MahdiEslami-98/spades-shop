import { AxiosError, AxiosRequestHeaders } from "axios";
import { get } from "./axiosInstance";
import Cookies from "js-cookie";

const logoutService = async () => {
  try {
    await get("/auth/logout", {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    } as AxiosRequestHeaders);
  } catch (error) {
    throw error as AxiosError;
  }
};

export default logoutService;
