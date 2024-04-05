import { AxiosError, AxiosRequestHeaders } from "axios";
import { get } from "./axiosInstance";
import Cookies from "js-cookie";

interface IOrderProductEntity {
  product: {
    rating: {
      rate: number;
      count: number;
    };
    _id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  count: number;
  _id: string;
}

export interface IGetOrderByIdRes {
  status: string;
  data: {
    order: {
      _id: string;
      user: {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        phoneNumber: string;
        address: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      products: IOrderProductEntity[];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: false;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

const getOrderById = async (id: string) => {
  try {
    const response = await get<IGetOrderByIdRes>(`/orders/${id}`, {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    } as AxiosRequestHeaders);

    if (response.status !== "success") throw new Error("خطای سرور");
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getOrderById;
