export interface IProductsRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IDataProducs;
}
interface IDataProducs {
  products?: ProductsEntity[] | null;
}
interface ProductsEntity {
  rating: Rating;
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
interface Rating {
  rate: number;
  count: number;
}
