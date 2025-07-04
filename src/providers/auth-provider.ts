import { whoamiCache } from '@/common/utils/whoami-cache';
import { Env } from '@/config/env';

export const authProvider = {
  async login() {
    return (window.location.href = `https://github.com/login/oauth/authorize?client_id=${Env.GITHUB_CLIENT_ID}&redirect_uri=${Env.API_URL}/auth/github/callback`);
  },
  async logout() {
    whoamiCache.invalidate();
    window.location.reload();
  },
};
