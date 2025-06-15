import { Env } from '@/config/env';
import { Ban } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

export const ServiceUnavailable: FC<PropsWithChildren> = ({ children }) => {
  const show = Env.SERVICE_UNAVALAIBLE;

  if (!(show === 'true')) {
    return <>{children}</>;
  }

  return (
    <div className="flex mt-[30vh] flex-col items-center justify-center h-full p-6 text-center text-gray-600">
      <Ban className="w-20 h-20 text-blue-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        OOPS !!! The service is temporarily unavailable.
      </h2>
      <p className="text-sm max-w-md text-gray-500">
        We're sorry for the inconvenience. We're currently updating and testing
        the site to improve your experience. Please check back again soon.
      </p>
    </div>
  );
};
