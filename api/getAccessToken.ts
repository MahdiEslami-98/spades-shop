import { post } from "./axiosInstance";

interface IGetTokenReq {
  refreshToken: string;
}

interface IGetTokenRes {
  status: string;
  token: {
    accessToken: string;
  };
}

const getAccessToken = async (token: string) => {
  try {
    const response = await post<IGetTokenReq, IGetTokenRes>("/auth/token", {
      refreshToken: token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getAccessToken;
