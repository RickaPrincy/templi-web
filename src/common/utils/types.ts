export type TemplateKey = {
  label: string;
  name: string;
  type: 'INPUT' | 'SELECT' | 'BOOLEAN';
  choices?: string[];
  default?: any;
  required?: boolean;
  clean?: boolean;
};

export type TemplateConfig = {
  excludes?: string[];
  scripts?: {
    before?: string[];
    after?: string[];
  };
  keys: TemplateKey[];
};

export type Template = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  command: string;
  path?: string;
  config: TemplateConfig;
  categories: string[];
  structure?: { [key: string]: string };
};
