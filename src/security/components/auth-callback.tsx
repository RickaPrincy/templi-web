import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { TempliLoader } from '@/common/components';
import { whoamiCache } from '@/common/utils/whoami-cache';

export const AuthCallback = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <TempliLoader />;
  }

  return <Navigate to="/" />;
};
