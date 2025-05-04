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
    url: 'https://github.com/RickaPrincy/templi-express-js.git',
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
];

export const TEMPLATES_CATEGORIES = Array.from(
  new Set(TEMPLATES.flatMap((template) => template.categories))
).sort();
