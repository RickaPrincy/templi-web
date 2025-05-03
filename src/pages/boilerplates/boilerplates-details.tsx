import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/common/components/Navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/components/ui/tabs';
import { Link as LinkIcon, ArrowLeft } from 'lucide-react';
import CodeBlock from '@/common/components/documentation/CodeBlock';
import { motion } from 'framer-motion';
import { TemplateModal } from '@/common/components/examples/TemplateModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/components/ui/accordion';
import { Badge } from '@/common/components/ui/badge';
import { GithubIcon } from '@/common/components/GithubIcon';

type Template = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  path?: string;
  command: string;
  templateJson: any;
  structure?: { [key: string]: string };
  categories: string[];
};

// Mock data for templates - in a real app, this would come from an API
const templates: Template[] = [
  {
    id: 'express-js',
    name: 'Express.js Template',
    description:
      'A modern Express.js application template with TypeScript support.',
    repoUrl: 'https://github.com/RickaPrincy/templi-express-js.git',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-express-js.git -o ~/myproject',
    templateJson: {
      excludes: ['.git', 'images', '.env.template', 'README.md', 'templi.json'],
      scripts: {
        before: [],
        after: [
          'cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"',
        ],
      },
      keys: [
        {
          label: 'Application name:',
          name: 'app_name',
          type: 'INPUT',
        },
        {
          label: 'Author name:',
          name: 'author',
          type: 'INPUT',
        },
        {
          label: 'Project description:',
          name: 'description',
          type: 'INPUT',
          clean: false,
          required: false,
        },
        {
          label: 'Select license:',
          name: 'license',
          type: 'SELECT',
          choices: ['MIT', 'ISC'],
        },
        {
          label: 'Is it private?',
          name: 'private',
          type: 'BOOLEAN',
          default: false,
        },
        {
          label: 'Version number:',
          name: 'version',
          type: 'INPUT',
        },
      ],
    },
    structure: {
      'src/': 'Source code directory',
      'src/controllers/': 'API controllers',
      'src/routes/': 'Express route definitions',
      'src/models/': 'Data models',
      'src/middleware/': 'Express middleware',
      'config/': 'Application configuration',
      'tests/': 'Unit and integration tests',
    },
    categories: ['JavaScript', 'Node.js', 'TypeScript', 'API'],
  },
  {
    id: 'poja-cli',
    name: 'Poja CLI Template',
    description: 'A modern CLI application template using Poja.',
    repoUrl: 'https://github.com/RickaPrincy/templi-templates.git',
    path: '/poja-cli',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /poja-cli -o ~/poja-std22052',
    templateJson: {
      excludes: ['.git', 'images', '.env.template', 'README.md', 'templi.json'],
      scripts: {
        before: [],
        after: [
          'cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"',
        ],
      },
      keys: [
        {
          label: 'Application name:',
          name: 'app_name',
          type: 'INPUT',
        },
        {
          label: 'Author name:',
          name: 'author',
          type: 'INPUT',
        },
        {
          label: 'Project description:',
          name: 'description',
          type: 'INPUT',
          clean: false,
          required: false,
        },
        {
          label: 'Select license:',
          name: 'license',
          type: 'SELECT',
          choices: ['MIT', 'ISC'],
        },
        {
          label: 'Is it private?',
          name: 'private',
          type: 'BOOLEAN',
          default: false,
        },
        {
          label: 'Version number:',
          name: 'version',
          type: 'INPUT',
        },
      ],
    },
    structure: {
      'src/': 'Source code directory',
      'bin/': 'CLI executable scripts',
      'lib/': 'Core library functions',
      'docs/': 'Documentation',
      'tests/': 'Test suite',
    },
    categories: ['Java', 'CLI', 'Spring'],
  },
  {
    id: 'cpp-library',
    name: 'C++ Library Template',
    description: 'A template for creating C++ libraries with modern CMake.',
    repoUrl: 'https://github.com/RickaPrincy/templi-templates.git',
    path: '/libc++',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /libc++ -o ~/libc++',
    templateJson: {
      excludes: ['.git', 'images', '.env.template', 'README.md', 'templi.json'],
      scripts: {
        before: [],
        after: [
          'cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"',
        ],
      },
      keys: [
        {
          label: 'Application name:',
          name: 'app_name',
          type: 'INPUT',
        },
        {
          label: 'Author name:',
          name: 'author',
          type: 'INPUT',
        },
        {
          label: 'Project description:',
          name: 'description',
          type: 'INPUT',
          clean: false,
          required: false,
        },
        {
          label: 'Select license:',
          name: 'license',
          type: 'SELECT',
          choices: ['MIT', 'ISC'],
        },
        {
          label: 'Is it private?',
          name: 'private',
          type: 'BOOLEAN',
          default: false,
        },
        {
          label: 'Version number:',
          name: 'version',
          type: 'INPUT',
        },
      ],
    },
    structure: {
      'include/': 'Public headers',
      'src/': 'Implementation source files',
      'test/': 'Test suite using GoogleTest',
      'examples/': 'Example usages',
      'cmake/': 'CMake modules',
      'docs/': 'Documentation',
    },
    categories: ['C++', 'Library', 'CMake'],
  },
  {
    id: 'react-app',
    name: 'React Application',
    description: 'A modern React application with Vite and TypeScript.',
    repoUrl: 'https://github.com/RickaPrincy/templi-templates.git',
    path: '/react-app',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /react-app -o ~/my-react-app',
    templateJson: {
      excludes: ['.git', 'images', '.env.template', 'README.md', 'templi.json'],
      scripts: {
        before: [],
        after: [
          'cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"',
        ],
      },
      keys: [
        {
          label: 'Application name:',
          name: 'app_name',
          type: 'INPUT',
        },
        {
          label: 'Author name:',
          name: 'author',
          type: 'INPUT',
        },
        {
          label: 'Project description:',
          name: 'description',
          type: 'INPUT',
          clean: false,
          required: false,
        },
        {
          label: 'Select license:',
          name: 'license',
          type: 'SELECT',
          choices: ['MIT', 'ISC'],
        },
        {
          label: 'Is it private?',
          name: 'private',
          type: 'BOOLEAN',
          default: false,
        },
        {
          label: 'Version number:',
          name: 'version',
          type: 'INPUT',
        },
      ],
    },
    structure: {
      'src/': 'Source code directory',
      'src/components/': 'React components',
      'src/hooks/': 'Custom React hooks',
      'src/pages/': 'Page components',
      'public/': 'Public assets',
      'index.html': 'HTML entry point',
    },
    categories: ['JavaScript', 'React', 'TypeScript', 'Frontend'],
  },
  {
    id: 'python-package',
    name: 'Python Package',
    description: 'A template for creating Python packages with modern tooling.',
    repoUrl: 'https://github.com/RickaPrincy/templi-templates.git',
    path: '/python-package',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /python-package -o ~/my-python-package',
    templateJson: {
      excludes: ['.git', 'images', '.env.template', 'README.md', 'templi.json'],
      scripts: {
        before: [],
        after: [
          'cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"',
        ],
      },
      keys: [
        {
          label: 'Application name:',
          name: 'app_name',
          type: 'INPUT',
        },
        {
          label: 'Author name:',
          name: 'author',
          type: 'INPUT',
        },
        {
          label: 'Project description:',
          name: 'description',
          type: 'INPUT',
          clean: false,
          required: false,
        },
        {
          label: 'Select license:',
          name: 'license',
          type: 'SELECT',
          choices: ['MIT', 'ISC'],
        },
        {
          label: 'Is it private?',
          name: 'private',
          type: 'BOOLEAN',
          default: false,
        },
        {
          label: 'Version number:',
          name: 'version',
          type: 'INPUT',
        },
      ],
    },
    structure: {
      'src/': 'Source code directory',
      'tests/': 'Test suite',
      'docs/': 'Documentation',
      'examples/': 'Example usage',
      'setup.py': 'Package setup script',
      'pyproject.toml': 'Project configuration',
    },
    categories: ['Python', 'Package', 'CLI'],
  },
];

export const BoilerplateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [_, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundTemplate = templates.find((t) => t.id === id);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    } else {
      navigate('/boilerplates');
    }
  }, [id, navigate]);

  const handleUseTemplate = () => {
    //TODO:
  };

  if (!template) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container max-w-5xl mx-auto px-4 py-8">
          <div className="text-center">Loading template...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/boilerplates')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Boilerplates
          </Button>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {template.name}
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
              <div className="flex flex-wrap gap-1 mt-2">
                {template.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="overview"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  <TabsTrigger value="command">Command</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description} This template provides a solid
                    foundation for building {template.name.split(' ')[0]}{' '}
                    applications.
                  </p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="config">
                      <AccordionTrigger className="text-sm">
                        View Template Configuration
                      </AccordionTrigger>
                      <AccordionContent className="bg-slate-100 dark:bg-slate-900 p-2 rounded">
                        <pre className="text-xs overflow-x-auto">
                          {JSON.stringify(template.templateJson, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="structure" className="py-4">
                  <div className="space-y-2">
                    {template.structure &&
                      Object.entries(template.structure).map(([path, desc]) => (
                        <div
                          key={path}
                          className="flex justify-between text-sm"
                        >
                          <code className="font-mono">{path}</code>
                          <span className="text-muted-foreground">{desc}</span>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="command" className="py-4">
                  <CodeBlock language="bash" code={template.command} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handleUseTemplate}
                className="w-full flex items-center gap-2"
              >
                <GithubIcon theme="dark" />
                Use Template
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={
                    template.path
                      ? `${template.repoUrl.replace('.git', '')}/tree/main${template.path}`
                      : template.repoUrl.replace('.git', '')
                  }
                  target="_blank"
                  className="w-full flex items-center gap-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              How to Use This Template
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong>Install Templi</strong>
                    <p>
                      Before using this template, make sure you have Templi
                      installed.
                    </p>
                  </li>
                  <li>
                    <strong>Generate the Project</strong>
                    <p>Run the following command to generate the project:</p>
                    <CodeBlock language="bash" code={template.command} />
                  </li>
                  <li>
                    <strong>Navigate and Run</strong>
                    <p>
                      After generation, navigate to the project directory and
                      start it:
                    </p>
                    <CodeBlock
                      language="bash"
                      code={`cd ~/${template.name.toLowerCase().replace(/\s+/g, '-')}\nnpm start`}
                    />
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      {template && (
        <TemplateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          templateName={template.name}
          templateUrl={template.repoUrl}
          templatePath={template.path}
          templateConfig={template.templateJson}
        />
      )}
    </div>
  );
};
