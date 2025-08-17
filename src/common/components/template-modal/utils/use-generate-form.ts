import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildGenerateProjectSchema } from './schema';
import { TemplateConfig } from '@/common/utils/types';
import { Template } from '@/gen/templi-web-api-client';
import { generateProjectCache } from '@/common/utils/generate-project-cache';

export type GenerateProjectFormValues = {
  repositoryName: string;
  installationId: string;
  isPrivateRepository: boolean;
  [key: string]: any;
};

export const useGenerateForm = (
  template: Template,
  templateConfig: TemplateConfig
) => {
  const formSchema = useMemo(
    () => buildGenerateProjectSchema(templateConfig),
    [JSON.stringify(templateConfig)]
  );
  const { values: cacheValues = {} } = generateProjectCache.get() ?? {};

  const form = useForm<GenerateProjectFormValues>({
    defaultValues: {
      repositoryName: cacheValues.repositoryName ?? '',
      installationId: cacheValues.installationId ?? '',
      isPrivateRepository: cacheValues.isPrivateRepository ?? true,
      ...Object.fromEntries(
        templateConfig.placeholders.map((placeholder) => {
          if (placeholder.type === 'TEXT') {
            return [placeholder.name, cacheValues[placeholder.name] ?? ''];
          }

          if (placeholder.type === 'SELECT') {
            return [
              placeholder.name,
              cacheValues[placeholder.name] ??
                placeholder.choices?.[0] ??
                undefined,
            ];
          }

          return [placeholder.name, cacheValues[placeholder.name] ?? false];
        })
      ),
    },
    resolver: zodResolver(formSchema),
  });

  form.watch((values) => {
    generateProjectCache.replace({
      template,
      values,
    });
  });

  return form;
};
