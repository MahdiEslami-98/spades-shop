export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginRes {
  status: string;
  token: IToken;
  data: IData;
}
interface IToken {
  accessToken: string;
  refreshToken: string;
}
interface IData {
  user: IUser;
}
interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}
