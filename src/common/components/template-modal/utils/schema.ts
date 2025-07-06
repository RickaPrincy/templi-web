import { z } from 'zod';
import { TemplateConfig, TemplatePlaceholder } from '@/common/utils/types';

const builtinZodValidators: Record<string, (message?: string) => z.ZodString> =
  {
    email: (msg) => z.string().email(msg || 'Invalid email'),
    required: (msg) =>
      z.string().regex(/^(?!\s*$).+/, msg || 'This field is required'),
    number: (msg) => z.string().regex(/^-?\d+$/, msg || 'Must be an integer'),
    floating: (msg) =>
      z.string().regex(/^-?\d+(\.\d+)?$/, msg || 'Must be a number'),
    lowercase: (msg) =>
      z.string().regex(/^[a-z]+$/, msg || 'Must be lowercase'),
    uppercase: (msg) =>
      z.string().regex(/^[A-Z]+$/, msg || 'Must be uppercase'),
  };

export const buildPlaceholderSchema = (fields: TemplatePlaceholder[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    const validators = field?.validators ?? [];
    const isOptional = validators.some((v) => v.pattern === 'optional');

    if (field.type != 'TEXT') {
      shape[field.name] = z.any();
      continue;
    }

    let zField = z.string();

    for (const validator of validators) {
      const { pattern, message } = validator;

      if (pattern === 'optional') {
        continue;
      }

      if (!(pattern in builtinZodValidators)) {
        const regex = new RegExp(pattern);
        const finalMessage = message || `Not matching pattern: ${pattern}`;
        zField = zField.regex(regex, finalMessage);
        continue;
      }

      const zValidation = builtinZodValidators[pattern](message);
      const checks = zValidation?._def?.checks ?? [];

      for (const check of checks) {
        if (check.kind === 'regex') {
          zField = zField.regex(check.regex, check.message);
        } else if (check.kind === 'email') {
          zField = zField.email(check.message);
        }
      }
    }

    if (isOptional) {
      zField = zField.optional() as any;
    }

    shape[field.name] = zField;
  }

  return shape;
};

const repoNameSchema = z
  .string()
  .min(1, 'Repository name is required')
  .max(100, 'Repository name is too long')
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    'Invalid repository name: only letters, digits, ., _ and - allowed'
  );

const BASE_GENERATE_PROJECT_SCHEMA = z.object({
  repositoryName: repoNameSchema,
  installationId: z.string().uuid(),
  isPrivateRepository: z.boolean(),
});

export const buildGenerateProjectSchema = (templateConfig: TemplateConfig) => {
  return BASE_GENERATE_PROJECT_SCHEMA.extend(
    buildPlaceholderSchema(templateConfig?.placeholders ?? [])
  );
};
