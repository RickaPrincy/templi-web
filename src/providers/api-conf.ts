import { Env } from '@/config/env';
import { Configuration } from '@/gen/templi-web-api-client';
import { whoamiCache } from '@/common/utils/whoami-cache';

export const getConfiguration = () => {
  const conf = new Configuration();
  conf.accessToken = whoamiCache.get()?.token ?? '';
  conf.basePath = Env.API_URL;
  return conf;
};
