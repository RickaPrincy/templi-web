import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { whoamiCache } from '@/common/utils/whoami-cache';

export const AuthCallback = () => {
  const [p] = useSearchParams();
  const token = p.get('token')!;

  useEffect(() => {
    whoamiCache.replace({
      id: '',
      name: '',
      email: '',
      avatar: '',
      token,
    });
  }, [token]);

  return <Navigate to="/" />;
};
