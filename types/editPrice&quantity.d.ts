export interface IEditProductPriceAndQuantityData {
  id: string;
  price?: string;
  quantity?: string;
}

export interface IEditPriceAndQuantityRes {
  status: string;
  data: {
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
  };
}
