import { IAllSubCategoryRes } from "@/types/getAllSubcategoryRes";
import { get } from "./axiosInstance";

const getSubcategoryByCategory = async (id: string) => {
  try {
    const response = await get<IAllSubCategoryRes>(`/subcategories?category=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getSubcategoryByCategory;
