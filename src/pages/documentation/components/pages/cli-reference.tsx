import { CodeBlock } from '@/common/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Terminal } from 'lucide-react';

export function CLIReference() {
  return (
    <section>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        CLI Reference
      </h1>

      <p className="text-lg text-muted-foreground mb-6">
        Complete reference for Templi's command-line interface commands and
        options.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Command Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">generate</h3>
              <p className="mb-3">Generates a new project from a template.</p>
              <CodeBlock
                language="bash"
                code={`templi generate -t <template_path> -o <output_path> [-p <path_suffix>]`}
                caption="Generate command syntax"
              />
              <p className="mt-4 mb-2">Options:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <code>-t, --template</code>: Path to the template directory or
                  GitHub repository
                </li>
                <li>
                  <code>-o, --output</code>: Output directory for the generated
                  project
                </li>
                <li>
                  <code>-p, --path-suffix</code>: Optional subfolder path for
                  monorepo templates
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">configure</h3>
              <p className="mb-3">
                Creates or updates templi.json configuration.
              </p>
              <CodeBlock
                language="bash"
                code={`templi configure -t <template_path>`}
                caption="Configure command syntax"
              />
              <p className="mt-4 mb-2">Options:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <code>-t, --template</code>: Path to the template directory
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
