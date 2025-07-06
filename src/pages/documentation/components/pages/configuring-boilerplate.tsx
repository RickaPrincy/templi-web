import { CodeBlock } from '@/common/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { FileJson, File, Code, Wrench } from 'lucide-react';

export const ConfiguringBoilerplatePage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Configuring a Boilerplate
    </h1>

    <p className="text-lg text-muted-foreground mb-6">
      Customize your template with the <code>templi.json</code> configuration
      file.
    </p>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <FileJson className="h-6 w-6" />
      The templi.json File
    </h2>

    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8  dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2">
        Creating Configuration Automatically
      </h3>
      <p>
        Instead of writing <code>templi.json</code> manually, you can generate
        it using the configure command:
      </p>
      <CodeBlock
        language="bash"
        code="templi configure -t ./myexpress-template"
        caption="Automatic configuration generation"
      />
      <p className="mt-4">
        This will analyze your template and create a <code>templi.json</code>{' '}
        configuration file with detected placeholders.
      </p>
    </div>

    <div className="bg-red-50 p-6 rounded-lg border border-blue-200 mb-8  dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2">Working with Binary Files</h3>
      <p className="mb-4">
        If your template contains binary files like images, you should exclude
        them in the <code>templi.json</code> file to prevent Templi from trying
        to parse them as text:
      </p>
      <CodeBlock
        language="json"
        code={`{
    "excludes": [
      "images/logo.png",
      "assets/fonts/arial.ttf"
    ]
  }`}
        caption="Example excludes configuration for binary files"
      />
      <p className="mt-4">
        You should create or edit the <code>templi.json</code> file to exclude
        binary files before running the configuration command.
      </p>
    </div>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Configuration Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          language="json"
          code={`{
    "scripts": {
      "before": [
        "cp /home/user/file.txt $\\{{TEMPLI_OUTPUT_FOLDER}}/file.txt"
      ],
      "after": [
        "cd $\\{{TEMPLI_OUTPUT_FOLDER}}",
        "git init"
      ]
    },
    "excludes": ["templi.json", "ignored_file.txt"],
    "keys": [
      {
        "name": "project_name",
        "label": "Application name:",
        "type": "TEXT",
        "validators": [
          {"pattern": "required"} 
        ]
      },
      {
        "name": "author_name",
        "label": "Author name:",
        "type": "TEXT",
        "validators": [
          {"pattern": "optional"} ,
          {"pattern": "[a-zA-Z]", message: "Must be lowercase"}
        ]
      },
      {
        "name": "license",
        "label": "Select license:",
        "type": "SELECT",
        "choices": {
          "1": "MIT",
          "2": "ISC"
        },
        "required": true
      }
    ]
  }`}
          caption="Example templi.json configuration"
        />
      </CardContent>
    </Card>

    <div className="space-y-8 mb-8">
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Code className="h-5 w-5" />
          Scripts
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>scripts</code> section defines commands to run before
              and after template generation:
            </p>
            <CodeBlock
              language="json"
              code={`"scripts": {
    "before": [
      "echo 'Starting template generation...'",
      "mkdir -p $\\{{TEMPLI_OUTPUT_FOLDER}}/logs"
    ],
    "after": [
      "cd $\\{{TEMPLI_OUTPUT_FOLDER}}",
      "npm install",
      "git init"
    ]
  }`}
              caption="Scripts configuration example"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <File className="h-5 w-5" />
          Excludes
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>excludes</code> array lists files and directories to
              exclude from the generated output:
            </p>
            <CodeBlock
              language="json"
              code={`"excludes": [
    "templi.json",
    "README.template.md",
    ".git",
    "node_modules"
  ]`}
              caption="Excludes configuration example"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Keys (Placeholders)
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>keys</code> array defines the placeholders and how they
              should be handled:
            </p>
            <CodeBlock
              language="json"
              code={`"keys": [
    {
      "name": "project_name",
      "label": "Application name:",
      "type": "TEXT",
      "validators": [
        {"pattern": "your_regex_pattern", "message": "error_message"}
      ]
    },
    {
      "name": "license",
      "label": "License",
      "type": "SELECT",
      "choices": ["MIT", "NOT_MIT"]
    }
  ]`}
              caption="Keys configuration example"
            />
            <p className="mt-4">Available key types:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <code>TEXT</code>: Text input
              </li>
              <li>
                <code>SELECT</code>: Option selection
              </li>
              <li>
                <code>BOOLEAN</code>: Yes/No input
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
