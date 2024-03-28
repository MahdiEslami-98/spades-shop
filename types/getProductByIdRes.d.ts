export interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
  category: {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  subcategory: {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  _id: string;
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
}

export interface IProductByIdRes {
  status: string;
  data: {
    product: IProduct;
  };
}
