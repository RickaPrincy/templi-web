import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Package, Book } from 'lucide-react';
import { CodeBlock } from '@/common/components';

export const IntroductionPage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Templi Documentation
    </h1>
    <p className="text-lg text-muted-foreground mb-6">
      Templi is a powerful tool that simplifies boilerplate creation and usage,
      available as both a library and a CLI.
    </p>

    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8 dark:bg-transparent">
      <Book className="h-10 w-10 text-blue-500" />
      <div>
        <h3 className="text-lg font-medium">What is Templi?</h3>
        <p>
          A modern tool for generating and managing project templates with
          customizable placeholders and scripts.
        </p>
      </div>
    </div>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Templi Project Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          language="text"
          code={`Name: templi
  Version: 4.0.0
  Description: Generate a project easily
  Author: RickaPrincy
  Github: <https://github.com/RickaPrincy/Templi>`}
        />
      </CardContent>
    </Card>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Simple template configuration with <code>templi.json</code>
            </li>
            <li>Powerful templating with placeholders</li>
            <li>Pre and post-generation scripts</li>
            <li>Supports both CLI and library usage</li>
            <li>Easy configuration with interactive prompts</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create standardized project structures</li>
            <li>Scaffold microservices with consistent patterns</li>
            <li>Build starter templates for your team</li>
            <li>Automate repetitive project setup tasks</li>
            <li>Share project templates with your organization</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
);
