export interface ICategoryByIdRes {
  status: string;
  data: {
    category: {
      _id: string;
      name: string;
      icon: string;
      createdAt: string;
      updatedAt: string;
      slugname: string;
      __v: number;
    };
  };
}
