import { Button } from '@/common/components/ui/button';
import { Link } from 'react-router-dom';
import { GithubIcon } from './github-icon';
import { ToggleThemeButton } from './toggle-theme-button';
import { useWhoami } from '@/security/hooks';
import { whoamiCache } from '../utils/whoami-cache';
import { authProvider } from '@/providers';

export const Navigation = () => {
  const whoami = useWhoami();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <div className="mr-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Templi</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/docs"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              to="/boilerplates"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              Boilerplates
            </Link>
            <a
              href="https://github.com/RickaPrincy/Templi"
              target="_blank"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>

        <div>
          {whoami ? (
            <div className="flex items-center gap-5">
              <h2 className="text-sm text-muted-foreground hidden md:inline">
                Signed in as {whoami.name}
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  whoamiCache.invalidate();
                  window.location.reload();
                }}
              >
                <GithubIcon />
                Sign Out
              </Button>
              <ToggleThemeButton />
            </div>
          ) : (
            <div className="flex gap-5">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => authProvider.login()}
              >
                <GithubIcon />
                Sign In with GitHub
              </Button>
              <ToggleThemeButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
