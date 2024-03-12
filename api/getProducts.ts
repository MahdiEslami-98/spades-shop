import { IProductsRes } from "@/types/getProductsRes";
import { get } from "./axiosInstance";

const getProducts = async (page = 1, sort = "", category = "", limit = 10) => {
  let c = "";
  if (category) {
    c = "&category=" + category;
  }
  try {
    const response = await get<IProductsRes>(
      `/products?page=${page}&limit=${limit}&sort=${sort}${c}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
