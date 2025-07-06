import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Folder, File } from 'lucide-react';
import { CodeBlock } from '@/common/components';

export const CreatingBoilerplatePage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Creating a Boilerplate
    </h1>

    <p className="text-lg text-muted-foreground mb-6">
      Learn how to create your own project boilerplate templates with Templi.
    </p>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Folder className="h-6 w-6" />
      Template Structure
    </h2>

    <p className="mb-4">
      A Templi template is simply a directory containing the files you want to
      use as a boilerplate. To create a template:
    </p>

    <div className="space-y-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>1. Create a Template Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            language="bash"
            code={`  mkdir my-express-template
  cd my-express-template`}
            caption="Create a directory for your template"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Create Your Template Files</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Add the files you want in your template. You can include
            placeholders in the files using double curly braces:
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
    </div>

    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8  dark:bg-transparent">
      <h3 className="text-xl font-semibold mb-2">
        Example: Express.js Template
      </h3>
      <p className="mb-4">
        Here's an example of a template structure for an Express.js application:
      </p>

      <div className="ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4" />
          <span>express-template/</span>
        </div>
        <div className="ml-6 space-y-2">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>package.json</span>
          </div>
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>README.md</span>
          </div>
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            <span>src/</span>
          </div>
          <div className="ml-6 space-y-2">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" />
              <span>app.js</span>
            </div>
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" />
              <span>{'{{filename}}'}.js</span>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              <span>routes/</span>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>index.js</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <File className="h-4 w-4 text-blue-500" />
          <span className="text-blue-700">templi.json</span>
        </div>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Creating Placeholders</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          In your template files, use double curly braces for placeholders:
        </p>
        <CodeBlock
          language="javascript"
          code={`// src/server.js
  const app = require('./app');
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(\`{{project_name}} server running on port \${PORT}\`);
  });`}
          caption="Example server.js with placeholders"
        />
      </CardContent>
    </Card>

    <h1 className="mt-10 text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Configuring a Boilerplate
    </h1>

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
  </section>
);
