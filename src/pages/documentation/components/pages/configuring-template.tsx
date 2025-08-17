import { CodeBlock } from '@/common/components';
import { Card, CardContent } from '@/common/components/ui/card';
import { FileJson, File, Code, Wrench } from 'lucide-react';

export const ConfiguringTemplatePage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Configuring a Template
    </h1>

    <p className="text-lg text-muted-foreground mb-8">
      When you generate a project from your template, Templi will automatically
      prompt you for values of all placeholders found in the template. These
      values can also be validated (for example, checking if a string is a valid
      email).
    </p>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <FileJson className="h-6 w-6" />
      The <code>templi.json</code> File
    </h2>

    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8 dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Code className="h-5 w-5 text-amber-600" />
        What <code>templi.json</code> Does
      </h3>
      <p className="mb-4">
        The <code>templi.json</code> file is the heart of your template
        configuration. It contains:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          All placeholders found in your template and how to prompt for them.
        </li>
        <li>
          Validation rules for inputs (e.g., must be an email, required field).
        </li>
        <li>
          Type of prompt to show the user (text input, yes/no, select options,
          etc.).
        </li>
        <li>Scripts to run before or after generating the project.</li>
      </ul>
      <p className="mt-4">
        The good news: Templi can generate this file automatically by analyzing
        your template and detecting all placeholders. After that, you can simply
        customize the prompt texts, placeholder types, validators, and scripts.
      </p>
    </div>

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

    <div className="space-y-8 mb-8">
      {/* Scripts */}
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Code className="h-5 w-5" />
          Scripts
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>scripts</code> section allows you to run shell commands
              before or after the template is generated.
            </p>
            <CodeBlock
              language="json"
              code={`"scripts": {
  "before": [
    "echo 'Starting template generation...'",
    "mkdir -p \{{ TEMPLI_OUTPUT_FOLDER }}/logs"
  ],
  "after": [
    "cd \{{ TEMPLI_OUTPUT_FOLDER }}",
    "npm install",
    "git init"
  ]
}`}
              caption="Scripts configuration example"
            />
          </CardContent>
        </Card>
      </div>

      {/* Excludes */}
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <File className="h-5 w-5" />
          Excludes
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>excludes</code> array lists files or directories to
              ignore during generation. Useful for binaries, node_modules, or
              temporary files.
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

      {/* Placeholders / Keys */}
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Placeholders (Keys)
        </h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The <code>placeholders</code> array defines all dynamic values in
              your template. Templi will automatically prompt the user for each
              placeholder when generating a project.
            </p>

            <CodeBlock
              language="json"
              code={`"placeholders": [
  {
    "type": "TEXT",
    "name": "author_name",
    "label": "Who is the author?",
    "validators": [
      { "pattern": "required" },
      { "pattern": "lowercase", "message": "Must be lowercase" }
    ]
  },
  {
    "name": "project_name",
    "label": "Select your project",
    "type": "SELECT",
    "choices": ["templi", "ctemplate"]
  },
  {
    "name": "is_ok",
    "label": "Are you ok?",
    "type": "BOOLEAN"
  }
]`}
              caption="Example placeholders configuration"
            />

            <p className="mt-4">
              <strong>Notes:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                All placeholders are <strong>required by default</strong>.
              </li>
              <li>
                Filenames and folder names can also contain placeholders, e.g.,{' '}
                <code>{'{{project_name}}_context.ts'}</code> or{' '}
                <code>src/{'{{project_name}}'}/index.ts</code>.
              </li>
              <li>Templi validates user inputs using built-in validators.</li>
            </ul>

            <p className="mt-4">
              <strong>Built-in validators:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <code className="text-blue-700">required</code>: Field must not
                be empty
              </li>
              <li>
                <code className="text-blue-700">optional</code>: Field can be
                empty
              </li>
              <li>
                <code className="text-blue-700">email</code>: Must be a valid
                email
              </li>
              <li>
                <code className="text-blue-700">number</code>: Must be an
                integer
              </li>
              <li>
                <code className="text-blue-700">lowercase</code>: All letters
                must be lowercase
              </li>
              <li>
                <code className="text-blue-700">uppercase</code>: All letters
                must be uppercase
              </li>
              <li>
                <code className="text-blue-700">floating</code>: Must be a
                floating point number
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
