import { Loader } from 'lucide-react';

export const TempliLoader = () => {
  return (
    <div className="w-full h-screen flex gap-1 flex-col justify-center items-center">
      <Loader className="h-10 w-10 animate-spin text-gray-600" />
    </div>
  );
};
