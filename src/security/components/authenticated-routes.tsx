import { useLocation } from 'react-router-dom';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { TempliLoader } from '@/common/components';
import { whoamiCache } from '@/common/utils/whoami-cache';
import { securityApi } from '@/providers';
import { unwrap } from '@/common/utils/unwrap';

const TO_SIGNOUT_STATUS = [401, 403];
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
        if (TO_SIGNOUT_STATUS.includes(e?.status)) {
          whoamiCache.invalidate();
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  if (isLoading) {
    return <TempliLoader />;
  }
  return <>{children}</>;
};
