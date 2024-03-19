export interface IAllSubCategoryRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IData;
}

export interface IData {
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
