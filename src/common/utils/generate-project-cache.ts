import { Template } from '@/gen/templi-web-api-client';
import { createCacheInLocalStorage } from './cache';

export type GenerateProjectCache = {
  template: Template;
  values: { [key: string]: any };
};

export const generateProjectCache =
  createCacheInLocalStorage<GenerateProjectCache>('generate-project');
