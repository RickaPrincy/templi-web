import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/common/components';
import DocumentationContent from '@/common/components/documentation/DocumentationContent';
import { DocumentationSidebar } from '@/common/components/documentation/DocumentationSidebar';
import { SidebarProvider } from '@/common/components/ui/sidebar';
import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Documentation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('introduction');
  const navigate = useNavigate();

  // Extract page from URL hash or default to introduction
  useLayoutEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    } else {
      // Set default page if no hash
      setCurrentPage('introduction');
      navigate('#introduction', { replace: true });
    }
  }, [location.hash, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SidebarProvider defaultOpen={true}>
        <div className="flex-1 flex w-full">
          <DocumentationSidebar currentPage={currentPage} />
          <AnimatePresence mode="wait">
            <DocumentationContent key={currentPage} currentPage={currentPage} />
          </AnimatePresence>
        </div>
      </SidebarProvider>
    </div>
  );
};
