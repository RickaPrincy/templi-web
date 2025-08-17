import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Folder, FileText, Rocket, Info } from 'lucide-react';
import { CodeBlock } from '@/common/components';

export const CreatingTemplatePage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Creating a Template
    </h1>

    <p className="mb-6 text-lg text-muted-foreground">
      To create a Templi template, follow these steps:
    </p>

    <div className="space-y-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            Step 1: Start a New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Start a new project the way you normally would, for example using
            Vite for a React project:
          </p>
          <CodeBlock
            language="bash"
            code={`npx create-vite my-app --template react
cd my-app
npm install react-router-dom tailwindcss eslint prettier
# configure Tailwind, ESLint, Prettier, etc.`}
            caption="Initial project setup"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Step 2: Replace Dynamic Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Once your project is fully configured, replace values that change
            for each new project with placeholders using double curly braces.
            This can include content inside files as well as filenames or folder
            names. For example:
          </p>
          <CodeBlock
            language="json"
            code={`// package.json
{
  "name": "{{project_name}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "author": "{{author_name}}",
  "license": "{{license}}"
}`}
            caption="Example package.json with placeholders"
          />
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 dark:bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Info className="h-5 w-5" />
            Tip: Placeholders in Filenames & Folders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-900">
            You can also use placeholders in filenames or folder names. For
            example:
            <code className="block mt-2">{'{{project_name}}_context.ts'}</code>
            <code className="block mt-1">
              src/{'{{project_name}}'}/index.ts
            </code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-purple-600" />
            Step 3: Your Template is Almost Ready
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-green-600 font-bold">
            When you later generate a new project from this template, Templi
            will automatically ask you to provide values for all placeholders
            found in the template.
          </p>
          <p className="mb-4">
            There is just one final step to fully configure the template so
            Templi can recognize it properly and manage placeholder inputs
            correctly. We'll see that on the next page.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
);
