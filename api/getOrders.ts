import { IOrders } from "@/types/getOrdersRes";
import { get } from "./axiosInstance";

const getOrders = async (status = "", page = 1, sort = "-createdAt") => {
  let stat = "";
  if (status) {
    stat = `&deliveryStatus=${status}`;
  }
  try {
    const response = await get<IOrders>(
      `/orders?limit=10&page=${page}&sort=${sort}${stat}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getOrders;
