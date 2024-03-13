import { AxiosRequestHeaders } from "axios";
import { deleteData } from "./axiosInstance";
import Cookies from "js-cookie";
import { IDeleteProductRes } from "@/types/deleteProductRes";

const deleteProductById = async (id: string) => {
  try {
    const response = await deleteData<IDeleteProductRes>(`/products/${id}`, {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    } as AxiosRequestHeaders);
    if (response.status !== "success") throw new Error("خطای سرور");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deleteProductById;
