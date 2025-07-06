export type TemplatePlaceholderValidator = {
  pattern: string;
  message?: string;
};

export type TemplatePlaceholder = {
  label: string;
  name: string;
  type: 'TEXT' | 'SELECT' | 'BOOLEAN';
  choices?: string[];
  validators: TemplatePlaceholderValidator[];
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
  } catch {
    return null;
  }
};
