import { AxiosError, AxiosRequestHeaders } from "axios";
import { patch } from "./axiosInstance";
import Cookies from "js-cookie";
import { IEditProductRes } from "@/types/editProductRes";

const editProduct = async (
  id: string,
  data: FormData,
): Promise<IEditProductRes | any> => {
  try {
    const response: IEditProductRes = await patch(`/products/${id}`, data, {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders);
    if (response.status !== "success") throw new Error("خطای سرور");
    return response;
  } catch (error) {
    throw (error as AxiosError).response;
  }
};

export default editProduct;
