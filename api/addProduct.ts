import { AxiosError, AxiosRequestHeaders } from "axios";
import { post } from "./axiosInstance";
import Cookies from "js-cookie";
import { IAddProduct } from "@/types/postProductRes";

const addProduct = async (data: FormData): Promise<IAddProduct | any> => {
  try {
    const response: IAddProduct = await post("/products", data, {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders);
    if (response.status !== "success") throw new Error("خطای سرور");
    return response;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export default addProduct;
