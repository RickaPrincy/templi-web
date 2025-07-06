import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildGenerateProjectSchema } from './schema';
import { TemplateConfig } from '@/common/utils/types';

export type GenerateProjectFormValues = {
  repositoryName: string;
  installationId: string;
  isPrivateRepository: boolean;
  [key: string]: any;
};

export const useGenerateForm = (templateConfig: TemplateConfig) => {
  const formSchema = useMemo(
    () => buildGenerateProjectSchema(templateConfig),
    [JSON.stringify(templateConfig)]
  );
  const form = useForm<GenerateProjectFormValues>({
    defaultValues: {
      repositoryName: '',
      installationId: '',
      isPrivateRepository: true,
      ...Object.fromEntries(
        templateConfig.placeholders.map((placeholder) => {
          if (placeholder.type === 'TEXT') {
            return [placeholder.name, ''];
          }

          if (placeholder.type === 'SELECT') {
            return [placeholder.name, placeholder.choices?.[0] ?? undefined];
          }

          return [placeholder.name, false];
        })
      ),
    },
    resolver: zodResolver(formSchema),
  });

  return form;
};
