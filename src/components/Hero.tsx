import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="container px-4 pt-16 pb-12 text-center lg:pt-32 relative">

      <motion.h1
        className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Simplify boilerplate{' '}
        <motion.span
          className="relative whitespace-nowrap bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          creation and usage
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
          className="text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          <Link to="/boilerplates">Get Started</Link>
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
