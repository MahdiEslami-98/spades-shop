import { IProductByIdRes } from "@/types/getProductByIdRes";
import { get } from "./axiosInstance";

const getProductById = async (id: string) => {
  try {
    const response = await get<IProductByIdRes>(`/products/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getProductById;
