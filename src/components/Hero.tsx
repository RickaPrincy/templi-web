import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container px-4 pt-16 pb-12 text-center lg:pt-32 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="absolute right-4 top-4"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <motion.h1
        className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Simplify{' '}
        <motion.span
          className="relative whitespace-nowrap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="relative bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            boilerplate creation
          </span>
        </motion.span>{' '}
        with Templi
      </motion.h1>
      <motion.p
        className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        A powerful tool that streamlines boilerplate creation and usage,
        available as both a library and CLI.
      </motion.p>
      <motion.div
        className="mt-10 flex justify-center gap-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          <a href="#quickstart">Get Started</a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="https://github.com/RickaPrincy/Templi" target="_blank">
            View on GitHub
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
