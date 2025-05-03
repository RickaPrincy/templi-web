import { Env } from './env';
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;
export const getAxios = (): AxiosInstance => {
  if (axiosInstance !== null) {
    return axiosInstance;
  }

  axiosInstance = axios.create({ baseURL: Env.API_URL });
  axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const location = error.response.headers['location'];
        if ((status === 302 || status === 307) && location) {
          window.location.href = location;
          return Promise.resolve();
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
