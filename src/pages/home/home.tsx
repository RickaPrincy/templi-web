import { Navigation } from '@/common/components';
import { Features, QuickStart, Hero } from './components';
import { Demo } from '@/common/components/demo';

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Demo />
        <Features />
        <QuickStart />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built by{' '}
            <a
              href="https://github.com/RickaPrincy"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              RickaPrincy
            </a>
            . Licensed under MIT.
          </p>
        </div>
      </footer>
    </div>
  );
};
