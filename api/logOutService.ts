import { AxiosRequestHeaders } from "axios";
import { get } from "./axiosInstance";
import Cookies from "js-cookie";

const logoutService = async () => {
  const header = {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  };

  try {
    const response = await get("/auth/logout", header as AxiosRequestHeaders);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default logoutService;
