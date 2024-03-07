import { ICategoryByIdRes } from "@/types/getCategoryByIdRes";
import { get } from "./axiosInstance";

const getCategoryById = async (id: string) => {
  try {
    const response = await get<ICategoryByIdRes>(`/categories/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getCategoryById;
