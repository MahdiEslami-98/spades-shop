import { AxiosError } from "axios";
import { patch } from "./axiosInstance";

const editOrderById = async (id: string, data: any) => {
  try {
    const response = await patch(`/orders/${id}`, data);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default editOrderById;
