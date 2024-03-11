import { ICategory } from "@/types/getAllCategoryRes";
import { get } from "./axiosInstance";

const getAllCategory = async () => {
  try {
    const response = await get<ICategory>("/categories");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCategory;
