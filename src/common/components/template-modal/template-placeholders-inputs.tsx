import { useGetConfiguration } from '@/common/hooks/providers';
import { useTemplateStore } from '@/common/stores';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { TempliLoader } from '../loader';
import { GenerateProjectFormValues } from './template-modal';
import { TemplatePlaceholderInputItem } from './template-placeholder-input-item';

export const TemplatePlaceHoldersInputs = () => {
  const form = useFormContext<GenerateProjectFormValues>();
  const template = useTemplateStore((state) => state.template);
  const { data: config, isLoading: isConfiguratonLoading } =
    useGetConfiguration(template);

  return (
    <>
      <p className="text-[20px] font-bold mt-[100px] mb-5 border-t pt-4 border-gray-300 text-gray-800">
        Template Placeholders
      </p>
      {isConfiguratonLoading && <TempliLoader />}
      {config &&
        config.placeholders.map((placeholder) => (
          <FormField
            key={placeholder.name}
            control={form.control}
            name={placeholder.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {placeholder.label}{' '}
                  {placeholder.required === false && (
                    <span className="text-gray-500">Optional</span>
                  )}
                </FormLabel>
                <FormControl>
                  <TemplatePlaceholderInputItem
                    placeholder={placeholder}
                    field={field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
    </>
  );
};
