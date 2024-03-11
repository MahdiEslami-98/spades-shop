import { IProductsRes, ProductsEntity } from "@/types/getProductsRes";
import { get } from "./axiosInstance";
import { ICategoryEntity } from "@/types/getAllCategoryRes";

const getProductsByCategory = async (category: ICategoryEntity[]) => {
  try {
    const response = await Promise.all(
      category.flatMap((cat) =>
        get<IProductsRes>(`/products?category=${cat._id}`),
      ),
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getProductsByCategory;
