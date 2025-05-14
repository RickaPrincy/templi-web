export type TemplatePlaceholder = {
  label: string;
  name: string;
  type: 'INPUT' | 'SELECT' | 'BOOLEAN';
  choices?: string[];
  default?: any;
  required?: boolean;
  remove_spaces?: boolean;
};

export type TemplateConfig = {
  excludes?: string[];
  scripts?: {
    before?: string[];
    after?: string[];
  };
  placeholders: TemplatePlaceholder[];
};

export const asTemplateConfig = (config: string) => {
  try {
    return JSON.parse(config) as TemplateConfig;
  } catch (e) {
    return null;
  }
};
