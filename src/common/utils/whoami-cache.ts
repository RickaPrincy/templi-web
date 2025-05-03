import { Whoami } from '@/gen/templi-web-api-client';
import { createCacheInLocalStorage } from './cache';

export const whoamiCache = createCacheInLocalStorage<Whoami>('whoami');
