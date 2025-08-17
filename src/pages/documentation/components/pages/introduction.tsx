import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Package, Rocket } from 'lucide-react';
import { CodeBlock } from '@/common/components';
import { Demo } from '@/common/components/demo';

export const IntroductionPage = () => (
  <section>
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

    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 mb-8 dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Rocket className="h-5 w-5 text-indigo-600" />
        How to Start a Project
      </h3>

      <h4 className="font-semibold mt-4 mb-2">
        Without Templi (React Example)
      </h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Initialize the project using Vite:{' '}
          <code>npm create vite@latest my-app</code>
        </li>
        <li>
          Install React Router DOM: <code>npm install react-router-dom</code>
        </li>
        <li>Set up Prettier and ESLint for code formatting and linting.</li>
        <li>Configure Tailwind CSS for styling.</li>
        <li>Configure i18n, ...</li>
        <li className="font-bold text-red-600">
          Repeat similar steps for every new project.
        </li>
      </ul>

      <h4 className="font-semibold mt-4 mb-2">With Templi</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li className="font-bold text-green-600">
          Create and configure a project once (e.g., Vite + React + React Router
          + Tailwind + ESLint + Prettier).
        </li>
        <li>
          Transform the configured project into a Templi template:{' '}
          <code className="text-blue-600">templi configure -t mytemplate</code>
        </li>
        <li>
          Generate a new project directly from this template:{' '}
          <code className="text-blue-600">
            templi generate -t mytemplate -o new_project_from_mytemplate
          </code>
        </li>
        <li>
          You can also use templates created by others directly from the templi
          web or templi cli.
        </li>
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        This workflow saves time and ensures consistency: configure once, create
        a reusable template, and generate any number of new projects directly
        from it without repeating setup steps.
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

    <Demo />
  </section>
);
