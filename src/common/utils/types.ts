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

export const asTemplateConfig = (config: string) => {
  try {
    return JSON.parse(config) as TemplateConfig;
  } catch (e) {
    return null; //TODO: refactor;
  }
};
