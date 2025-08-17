import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { ThemeProvider } from '@/common/components';
import { Toaster } from '@/common/components/ui/toaster';
import { Toaster as Sonner } from '@/common/components/ui/sonner';
import { TooltipProvider } from '@/common/components/ui/tooltip';
import { AuthenticatedRoutes } from './security/components';

import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Documentation } from './pages/documentation';
import { TemplateDetails, Templates } from './pages/templates';
import { AuthCallback } from './security/components/auth-callback';
import { TemplateModal } from './common/components/template-modal';
import { generateProjectCache } from './common/utils/generate-project-cache';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
    },
  },
});

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === 'templates' || pathname === '/auth/github/callback') {
      return;
    }

    if (generateProjectCache.isPresent()) {
      navigate('/templates');
    }
  }, [location.pathname]);

  return (
    <>
      <Toaster />
      <Sonner />
      <TemplateModal />
      <Routes>
        <Route
          element={
            <AuthenticatedRoutes>
              <Outlet />
            </AuthenticatedRoutes>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateDetails />} />
        </Route>
        <Route path="/docs" element={<Documentation />} />
        <Route path="/auth/github/callback" element={<AuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
