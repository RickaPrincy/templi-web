import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
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

  //TODO: loader
  if (isLoading) {
    return null;
  }

  return <Navigate to="/" />;
};
