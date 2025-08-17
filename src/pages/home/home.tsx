import { Navigation } from '@/common/components';
import { Features, QuickStartComparison, Hero } from './components';
import { Demo } from '@/common/components/demo';
import { Orb } from './components/orb';

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="w-full">
        <div
          style={{
            width: '100%',
            height: '700px',
            position: 'absolute',
            opacity: 0.5,
          }}
        >
          <Orb
            hue={0}
            hoverIntensity={1}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        <Hero />
        <QuickStartComparison />
        <Demo />
        <Features />
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
