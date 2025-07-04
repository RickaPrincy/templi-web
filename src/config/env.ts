const createEnv = <T extends string>(envs: T[]): Record<T, string> => {
  return envs.reduce(
    (acc, envName) => {
      const envValue = process.env[envName];
      if (envValue === undefined) {
        throw new Error(`Env.${envName} is missing.`);
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
  'EMAILJS_PUBLIC_KEY',
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
]);
