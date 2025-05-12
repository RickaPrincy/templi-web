import { ResourcesApi, SecurityApi } from '@/gen/templi-web-api-client';
import { getAxios } from '@/config/axios';
import { getConfiguration } from './api-conf';

export const securityApi = () =>
  new SecurityApi(getConfiguration(), undefined, getAxios());

export const resourcesApi = () =>
  new ResourcesApi(getConfiguration(), undefined, getAxios());
