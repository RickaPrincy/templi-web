import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { ThemeProvider } from '@/common/components';
import { Toaster } from '@/common/components/ui/toaster';
import { Toaster as Sonner } from '@/common/components/ui/sonner';
import { TooltipProvider } from '@/common/components/ui/tooltip';
import { AuthenticatedRoutes } from './security/components';

import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Documentation } from './pages/documentation';
import { BoilerplateDetails, Boilerplates } from './pages/boilerplates';
import { AuthCallback } from './security/components/auth-callback';
import { TemplateModal } from './common/components/template-modal';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <BrowserRouter>
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
              <Route path="/docs" element={<Documentation />} />
              <Route path="/" element={<Home />} />
              <Route path="/boilerplates" element={<Boilerplates />} />
              <Route
                path="/boilerplates/:id"
                element={<BoilerplateDetails />}
              />
            </Route>
            <Route path="/auth/github/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
