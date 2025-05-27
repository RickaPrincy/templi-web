import { useWhoami } from './use-whoami';

export const useIsAuthenticated = () => {
  const whoami = useWhoami();
  return whoami !== null;
};
