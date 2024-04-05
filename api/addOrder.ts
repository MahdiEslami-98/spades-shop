import { AxiosError } from "axios";
import { post } from "./axiosInstance";

interface IAddOrderProduct {
  product: string;
  count: number;
}
export interface IAddOrderReq {
  user: string;
  products: IAddOrderProduct[];
  deliveryStatus: boolean;
  deliveryDate: string;
}

interface IAddOrderResProductEntity {
  product: {
    _id: string;
    price: number;
  };
  count: number;
  _id: string;
}

interface IAddOrderRes {
  status: string;
  data: {
    order: {
      user: string;
      products: IAddOrderResProductEntity[];
      totalPrice: number;
      deliveryDat: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

const addOrder = async (data: IAddOrderReq) => {
  try {
    const response = await post<IAddOrderReq, IAddOrderRes>("/orders", data);
    if (response.status !== "success") throw new Error("خطای سرور");
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addOrder;
