import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Check, Package, Rocket, Star, X } from 'lucide-react';
import { CodeBlock } from '@/common/components';
import { Demo } from '@/common/components/demo';
import { motion } from 'framer-motion';

const QuickStartComparison = () => {
  const floatAnimation = {
    y: [0, -6, 0], // floating up and down
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  };

  const gradientIconClasses =
    'bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 rounded-full flex items-center justify-center';

  return (
    <div className="w-full flex flex-wrap justify-center gap-8">
      {/* Without Templi */}
      <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-xl max-w-[350px] py-5">
        <CardHeader className="flex items-center gap-3">
          <motion.div className={gradientIconClasses} animate={floatAnimation}>
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
          <motion.div className={gradientIconClasses} animate={floatAnimation}>
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
          <motion.div className={gradientIconClasses} animate={floatAnimation}>
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
            <li>Ensure consistency and best practices across the community</li>
            <li>
              Focus on building features instead of setting up projects from
              scratch
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export const IntroductionPage = () => (
  <section className="w-full">
    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Templi Documentation
    </h1>

    <p className="text-lg text-muted-foreground mb-6">
      Templi is a powerful tool that simplifies template creation and usage,
      available as both a library, a CLI — and also as a template repository.
    </p>

    <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8 dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Rocket className="h-5 w-5 text-blue-500" />
        What exactly is Templi?
      </h3>
      <p>
        A modern tool for generating and managing project templates, with
        customizable placeholders, scripts, and a ready-to-use template
        repository.
      </p>
    </div>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Templi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          language="text"
          code={`  Name: templi
  Version: 4.1.2
  Description: Quickly scaffold a project with templates
  Author: RickaPrincy
  Github: <https://github.com/RickaPrincy/Templi>`}
        />
      </CardContent>
    </Card>

    <QuickStartComparison />

    <Demo />
  </section>
);
