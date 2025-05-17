import { Card, CardContent } from '@/common/components/ui/card';
import { Terminal, Library, Download } from 'lucide-react';
import { CodeBlock } from '@/common/components';

export const InstallationPage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Installation
    </h1>

    <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 mb-8  dark:bg-transparent">
      <Download className="h-10 w-10 text-amber-500" />
      <p>
        Templi can be installed globally as a CLI tool or as a library in your
        project.
      </p>
    </div>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Terminal className="h-6 w-6" />
      CLI Installation
    </h2>

    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">Install Templi globally using npm:</p>
        <CodeBlock
          language="bash"
          code="npm install -g templi"
          caption="Global installation command"
        />
        <p className="mt-4 text-muted-foreground">
          This makes the <code>templi</code> command available throughout your
          system.
        </p>
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Library className="h-6 w-6" />
      Library Installation
    </h2>

    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">Install Templi as a dependency in your project:</p>
        <CodeBlock
          language="bash"
          code="npm install templi"
          caption="Local installation command"
        />
        <p className="mt-4 text-muted-foreground">
          Then import and use it in your code:
        </p>
        <CodeBlock
          language="javascript"
          code={`const { Templi } = require('templi');
  
  // Now use Templi in your code
  const templi = new Templi();`}
          caption="Basic usage example"
        />
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6">Verifying Installation</h2>

    <Card>
      <CardContent className="pt-6">
        <p className="mb-4">Check that Templi is installed correctly:</p>
        <CodeBlock
          language="bash"
          code="templi --version"
          caption="Check installed version"
        />
        <p className="mt-4 text-muted-foreground">
          This should display the installed version of Templi.
        </p>
      </CardContent>
    </Card>
  </section>
);
