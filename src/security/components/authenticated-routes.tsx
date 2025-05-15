import { useLocation } from 'react-router-dom';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { whoamiCache } from '@/common/utils/whoami-cache';
import { securityApi } from '@/providers';
import { unwrap } from '@/common/utils/unwrap';
import { Loader } from 'lucide-react';

const TO_SIGNOUT_STATUS = [401, 403];
export const AuthenticatedRoutes: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const isOnDocsPage = useMemo(
    () => location.pathname && location.pathname == '/docs',
    [location.pathname]
  );

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

  return isLoading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader className="h-10 w-10 animate-spin text-gray-600" />
    </div>
  ) : (
    <>
      <div className={`${isOnDocsPage ? 'ml-[255px]' : ''}`}>{children}</div>
    </>
  );
};
