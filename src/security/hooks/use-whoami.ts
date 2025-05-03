import { whoamiCache } from '@/common/utils/whoami-cache';

export const useWhoami = () => {
  return whoamiCache.get();
};
