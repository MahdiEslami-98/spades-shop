import { AxiosError, AxiosRequestHeaders } from "axios";
import { patch } from "./axiosInstance";
import {
  IEditPriceAndQuantityRes,
  IEditProductPriceAndQuantityData,
} from "@/types/editPrice&quantity";
import Cookies from "js-cookie";

const editProductPriceAndQuantity = async (
  data: IEditProductPriceAndQuantityData[],
): Promise<IEditPriceAndQuantityRes[] | any> => {
  try {
    const response = await Promise.all(
      data.map(async (item) => {
        const myForm = new FormData();
        if (item.price) {
          myForm.append("price", item.price);
        }
        if (item.quantity) {
          myForm.append("quantity", item.quantity);
        }
        const res = await patch(`/products/${item.id}`, myForm, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        } as AxiosRequestHeaders);
        return res as IEditPriceAndQuantityRes;
      }),
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default editProductPriceAndQuantity;
