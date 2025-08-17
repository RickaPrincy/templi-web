import { Link } from 'react-router-dom';
import { Button } from '@/common/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TypingText = ({
  texts,
  speed = 100,
  pause = 1500,
}: {
  texts: string[];
  speed?: number;
  pause?: number;
}) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[index];

        if (!isDeleting) {
          setDisplayed(current.substring(0, subIndex + 1));
          setSubIndex(subIndex + 1);

          if (subIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setDisplayed(current.substring(0, subIndex - 1));
          setSubIndex(subIndex - 1);

          if (subIndex === 0) {
            setIsDeleting(false);
            setIndex((index + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, texts, speed, pause]);

  return (
    <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
};

export const Hero = () => {
  return (
    <div className="container mb-[150px] px-4 pt-16 pb-12 text-center lg:pt-32 relative">
      {/* Title */}
      <motion.h1
        className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Stop doing the same setup for every project,
        <br />
        <TypingText
          texts={['simplify it with Templi']}
          speed={80}
          pause={1500}
        />
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
      >
        Configure a project once and reuse it as a template. Templi streamlines
        project setup, automatically manages placeholders, and saves you from
        repeating the same configuration for every new project.
      </motion.p>

      <motion.div
        className="mt-10 flex justify-center gap-x-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Get Started Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Button
            asChild
            size="lg"
            className="text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 flex items-center gap-2"
          >
            <Link to="/templates">
              Get Started
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }} // move left on hover
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>

        {/* Documentation Button */}
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="flex items-center gap-2"
          >
            <Link to="/docs">
              Documentation
              <BookOpen className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      {/* Cursor animation style */}
      <style>{`
        .animate-blink {
          display: inline-block;
          width: 1ch;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
