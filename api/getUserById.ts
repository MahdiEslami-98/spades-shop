import { IUserByIdRes } from "@/types/getUserById";
import { get } from "./axiosInstance";
import { AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

const getUserById = async (id: string) => {
  try {
    const response = await get<IUserByIdRes>(`/users/${id}`, {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    } as AxiosRequestHeaders);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getUserById;
