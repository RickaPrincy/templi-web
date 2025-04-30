import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Navigation = () => {
  const { user, login, logout } = useAuth();

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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden md:inline">
                Signed in as {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={logout}
              >
                <Github className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={login}
            >
              <Github className="h-4 w-4" />
              Sign In with GitHub
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
