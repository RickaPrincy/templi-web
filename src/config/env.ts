const createEnv = <T extends string>(envs: T[]): Record<T, string> => {
  return envs.reduce(
    (acc, envName) => {
      const envValue = process.env[envName];
      if (envValue === undefined) {
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
  'SERVICE_UNAVALAIBLE',
  'GITHUB_CLIENT_ID',
  'GITHUB_APP_NAME',
]);
