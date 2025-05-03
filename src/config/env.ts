const createEnv = <T extends string>(envs: T[]): Record<T, string> => {
  return envs.reduce(
    (acc, envName) => {
      const envValue = process.env[envName];
      if (!envValue) {
        console.warn(`Env.${envName} may be missing.`);
      }
      acc[envName] = envValue as string;
      return acc;
    },
    {} as Record<T, string>
  );
};

export const Env = createEnv([
  'API_URL',
  'GITHUB_APP_ID',
  'GITHUB_CLIENT_ID',
  'GITHUB_PRIVATE_KEY',
  'GITHUB_CLIENT_SECRET',
  'GITHUB_APP_OAUTH_URL',
]);
