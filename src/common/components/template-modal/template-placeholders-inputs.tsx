import { FC } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { TemplatePlaceholderInputItem } from './template-placeholder-input-item';
import { TemplateConfig } from '@/common/utils/types';
import { GenerateProjectFormValues } from './utils/use-generate-form';

export const TemplatePlaceHoldersInputs: FC<{
  templateConfig: TemplateConfig;
}> = ({ templateConfig }) => {
  const form = useFormContext<GenerateProjectFormValues>();

  return (
    <>
      <p className="text-[20px] font-bold mt-[100px] mb-5 border-t pt-4 border-gray-300 text-gray-800">
        Template Placeholders
      </p>
      {templateConfig &&
        templateConfig.placeholders.map((placeholder) => (
          <FormField
            key={placeholder.name}
            control={form.control}
            name={placeholder.name}
            render={({ field, formState: { errors = {} } }) => (
              <FormItem>
                <FormLabel>{placeholder.label}</FormLabel>
                <FormControl>
                  <TemplatePlaceholderInputItem
                    placeholder={placeholder}
                    field={field}
                  />
                </FormControl>
                {errors[field.name] && (
                  <p className="text-red-500">
                    {errors[field.name].message.toString()}
                  </p>
                )}
              </FormItem>
            )}
          />
        ))}
    </>
  );
};
