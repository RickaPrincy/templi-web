import { App } from '@octokit/app';
import { Env } from './env';

export const OCTOKIT_APP = new App({
  appId: Env.GITHUB_APP_ID,
  privateKey: Env.GITHUB_PRIVATE_KEY,
  oauth: {
    clientId: Env.GITHUB_CLIENT_ID,
    clientSecret: Env.GITHUB_CLIENT_SECRET,
  },
});
