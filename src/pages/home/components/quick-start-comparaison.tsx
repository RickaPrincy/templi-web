import { X, Check, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { motion } from 'framer-motion';

export const QuickStartComparison = () => {
  const floatAnimation = {
    y: [0, -6, 0], // floating up and down
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  };

  const gradientIconClasses =
    'bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 rounded-full flex items-center justify-center';

  return (
    <section id="quickstart" className="container px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Stop Repeating Project Setup
      </h2>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Configure once, create reusable templates, and generate new projects
        instantly without repeating setup steps.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Without Templi */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-xl max-w-[350px] py-5">
          <CardHeader className="flex items-center gap-3">
            <motion.div
              className={gradientIconClasses}
              animate={floatAnimation}
            >
              <X className="h-5 w-5" />
            </motion.div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Without Templi (React Example)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-foreground">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Initialize projects manually using Vite:{' '}
                <code className="font-mono">npm create vite@latest my-app</code>
              </li>
              <li>Install and configure dependencies separately</li>
              <li>Set up ESLint, Prettier, and testing from scratch</li>
              <li>Configure styling and build tools manually</li>
              <li className="text-red-500">
                Repeat these tedious steps for every new project
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* With Templi */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-xl max-w-[350px] py-5">
          <CardHeader className="flex items-center gap-3">
            <motion.div
              className={gradientIconClasses}
              animate={floatAnimation}
            >
              <Check className="h-5 w-5" />
            </motion.div>
            <CardTitle className="text-lg font-semibold text-foreground">
              With Templi
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-foreground">
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-green-500">
                Configure your project once with modern tools and best practices
              </li>
              <li>
                Transform the project into a reusable template:{' '}
                <code className="text-blue-600 font-mono">
                  templi configure -t mytemplate
                </code>
              </li>
              <li>
                Generate new projects directly from this template:{' '}
                <code className="text-blue-600 font-mono">
                  templi generate -t mytemplate -o new_project
                </code>
              </li>
              <li>Use templates shared by others without repeating setup</li>
            </ul>
          </CardContent>
        </Card>

        {/* Bonus / Community */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-xl max-w-[350px] py-5">
          <CardHeader className="flex items-center gap-3">
            <motion.div
              className={gradientIconClasses}
              animate={floatAnimation}
            >
              <Star className="h-5 w-5" />
            </motion.div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Community & Bonus
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-foreground">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Share your templates so others can use them directly in their
                projects
              </li>
              <li>
                Use templates created by others to bootstrap your project
                instantly
              </li>
              <li>
                Ensure consistency and best practices across the community
              </li>
              <li>
                Focus on building features instead of setting up projects from
                scratch
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
