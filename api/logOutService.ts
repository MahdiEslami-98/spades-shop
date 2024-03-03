import { get } from "./axiosInstance";

const logoutService = async () => {
  try {
    const response = await get("/auth/logout");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default logoutService;
