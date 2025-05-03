import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { Toaster } from '@/common/components/ui/toaster';
import { Toaster as Sonner } from '@/common/components/ui/sonner';
import { TooltipProvider } from '@/common/components/ui/tooltip';
import { ThemeProvider } from '@/common/components/ThemeProvider';
import { AuthenticatedRoutes } from './security/components';

import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Documentation } from './pages/documentation';
import { BoilerplateDetails, Boilerplates } from './pages/boilerplates';
import { AuthCallback } from './security/components/auth-callback';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route
              element={
                <AuthenticatedRoutes>
                  <Outlet />
                </AuthenticatedRoutes>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/boilerplates" element={<Boilerplates />} />
              <Route
                path="/boilerplates/:id"
                element={<BoilerplateDetails />}
              />
              <Route
                path="/examples"
                element={<Navigate to="/boilerplates" replace />}
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
