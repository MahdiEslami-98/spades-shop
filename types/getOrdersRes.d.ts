export interface IOrders {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IDataOrder;
}
export interface IDataOrder {
  orders: IOrdersEntity[] | [];
}
export interface IOrdersEntity {
  _id: string;
  user: string;
  products: IProductsEntity[] | [];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IProductsEntity {
  product: string;
  count: number;
  _id: string;
}
