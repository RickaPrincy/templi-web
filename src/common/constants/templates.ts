import { Template, TemplateConfig } from '../utils/types';

export const TEMPLATE_CONFIG: TemplateConfig = {
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
};

export const TEMPLATES: Template[] = [
  {
    id: 'express-js',
    name: 'Express.js Template',
    description:
      'A modern Express.js application template with TypeScript support.',
    repoUrl: 'https://github.com/RickaPrincy/templi-express-js.git',
    command:
      'templi generate -t https://github.com/RickaPrincy/templi-express-js.git -o ~/myproject',
    config: TEMPLATE_CONFIG,
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
    config: TEMPLATE_CONFIG,
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
    config: TEMPLATE_CONFIG,
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
    config: TEMPLATE_CONFIG,
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
    config: TEMPLATE_CONFIG,
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

export const TEMPLATES_CATEGORIES = Array.from(
  new Set(TEMPLATES.flatMap((template) => template.categories))
).sort();
