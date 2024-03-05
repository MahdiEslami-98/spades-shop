import { IProductsRes } from "@/types/getProductsRes";
import { get } from "./axiosInstance";

const getProducts = async (page = 1, sort = "", brand = "") => {
  let b = "";
  if (brand) {
    b = "&brand=" + brand;
  }
  try {
    const response = await get<IProductsRes>(
      `/products?page=${page}&limit=${10}&sort=${sort}${b}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
