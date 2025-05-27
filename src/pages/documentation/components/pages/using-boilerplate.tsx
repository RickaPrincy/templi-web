import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Terminal, Library } from 'lucide-react';
import { CodeBlock } from '@/common/components';

import promptImage from '../../assets/images/prompt.png';

export const UsingBoilerplatePage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Using Your Boilerplate
    </h1>

    <p className="text-lg text-muted-foreground mb-6">
      Generate projects from your templates using the Templi CLI or library.
    </p>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Terminal className="h-6 w-6" />
      CLI Usage
    </h2>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Generate Command</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Generate a new project from your template:</p>
        <CodeBlock
          language="bash"
          code="templi generate -t ./myexpress-template -o ./output-project"
          caption="Basic generate command"
        />
        <p className="mt-4">Options:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            <code>-t, --template</code>: Path to the template directory
          </li>
          <li>
            <code>-o, --output</code>: Output directory for the generated
            project
          </li>
          <li>
            <code>-s, --scope</code>: (Optional) Subfolder for monorepo projects
          </li>
        </ul>
      </CardContent>
    </Card>

    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8  dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2">Interactive Prompts</h3>
      <p className="mb-4">
        When generating a project, Templi will prompt you for the values of
        placeholders defined in <code>templi.json</code>:
      </p>
      <img
        src={promptImage}
        alt="Templi interactive prompts"
        className="mt-4 rounded-md border border-blue-300 shadow-sm"
      />
    </div>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Library className="h-6 w-6" />
      Library Usage
    </h2>

    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">
          Use Templi programmatically in your JavaScript/TypeScript code:
        </p>
        <CodeBlock
          language="javascript"
          code={`
// Generate from template with predefined values
Templi::generate("./my-template", "./output", 
{
  {"project_name": "awesome-project",
  {"author_name":" "John Doe"},
  {"version": "1.0.0"},
  {"description": "My awesome project"},
  {"license": "MIT"},
  {"is_private": "true"}
});`}
          caption="Programmatic usage example"
        />
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6">Output Result</h2>
    <Card>
      <CardContent className="bg-transparent pt-6">
        <p>
          The generated project will have all placeholders replaced with the
          provided values and any scripts defined in <code>templi.json</code>{' '}
          will have been executed.
        </p>
      </CardContent>
    </Card>
  </section>
);
