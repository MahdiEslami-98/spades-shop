import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const httpService = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});

const baseApi = async <T>(
  url: string,
  options: AxiosRequestConfig,
): Promise<T> => {
  const response = await httpService(url, options);
  return response.data as T;
};

const get = async <T>(
  url: string,
  headers?: AxiosRequestHeaders,
): Promise<T> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    headers: headers,
  };
  return await baseApi<T>(url, options);
};

const post = async <TReq, TRes>(
  url: string,
  data: TReq,
  headers?: AxiosRequestHeaders,
): Promise<TRes> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    headers: headers,
    data: data,
  };
  return await baseApi<TRes>(url, options);
};

const put = async <TReq, TRes>(
  url: string,
  data: TReq,
  headers?: AxiosRequestHeaders,
): Promise<TRes> => {
  const options: AxiosRequestConfig = {
    method: "PUT",
    headers: headers,
    data: data,
  };
  return await baseApi<TRes>(url, options);
};

const deleteData = <TRes>(
  url: string,
  headers?: AxiosRequestHeaders,
): Promise<TRes> => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers: headers,
  };
  return baseApi(url, options);
};

const patch = async <TReq, TRes>(
  url: string,
  data: TReq,
  headers?: AxiosRequestHeaders,
) => {
  const options: AxiosRequestConfig = {
    method: "PATCH",
    headers: headers,
    data: data,
  };
  return await baseApi<TRes>(url, options);
};

export { get, post, put, patch, deleteData };
