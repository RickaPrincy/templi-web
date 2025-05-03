import { AxiosResponse, isAxiosError } from 'axios';

export const extractApiError = (error: any) => {
  if (error && isAxiosError(error)) {
    const { response: rawRes, config: reqConf } = error;
    return {
      ...rawRes?.data,
      status: rawRes?.status,
      rawRes,
      reqConf,
    };
  }
  return error;
};

export type UnwrapResult<TReturn extends () => Promise<AxiosResponse<any>>> =
  TReturn extends () => Promise<AxiosResponse<infer Res>> ? Res : never;

export const unwrap = async <Fn extends () => Promise<AxiosResponse<any>>>(
  execute: Fn
): Promise<UnwrapResult<Fn>> => {
  try {
    return (await execute()).data;
  } catch (e) {
    throw extractApiError(e);
  }
};
