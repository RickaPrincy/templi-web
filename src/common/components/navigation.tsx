import { Button } from '@/common/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { GithubIcon } from './github-icon';
import { ToggleThemeButton } from './toggle-theme-button';
import { useWhoami } from '@/security/hooks';
import { whoamiCache } from '../utils/whoami-cache';
import { authProvider } from '@/providers';

const links = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/docs',
    name: 'Documentation',
  },
  {
    href: '/templates',
    name: 'Templates',
  },
  {
    href: 'https://github.com/RickaPrincy/Templi',
    name: 'GitHub',
    target: '_blank',
  },
];

export const Navigation = () => {
  const whoami = useWhoami();
  const location = useLocation();

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
            {links.map((link) => {
              const isActive = location.pathname == link.href;

              return (
                <Link
                  key={link.href}
                  target={link?.target || ''}
                  to={link.href}
                  className={`text-foreground/60 transition-colors hover:text-foreground ${isActive ? '!text-foreground' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
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
