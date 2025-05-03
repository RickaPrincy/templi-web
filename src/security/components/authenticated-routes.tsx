import { isAxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { whoamiCache } from '@/common/utils/whoami-cache';
import { securityApi } from '@/providers';
import { unwrap } from '@/common/utils/unwrap';

export const AuthenticatedRoutes: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const whoami = await unwrap(() => securityApi().whoami());
        whoamiCache.replace(whoami);
      } catch (e) {
        if (isAxiosError(e) && e.response.status === 403) {
          whoamiCache.invalidate();
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  return isLoading ? (
    <div className="w-full flex justify-center mt-20">
      <p className="text-[30px]">Loading...</p>
    </div>
  ) : (
    <>{children}</>
  );
};
