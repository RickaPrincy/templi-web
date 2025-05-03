import { Env } from './env';
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;
export const getAxios = (): AxiosInstance => {
  if (axiosInstance !== null) {
    return axiosInstance;
  }

  axiosInstance = axios.create({ baseURL: Env.API_URL });
  return axiosInstance;
};
