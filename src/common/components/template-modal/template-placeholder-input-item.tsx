import { FC, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Input } from '@/common/components/ui/input';
import { Checkbox } from '@/common/components/ui/checkbox';
import { ControllerRenderProps } from 'react-hook-form';
import { TemplatePlaceholder } from '@/common/utils/types';
import { GenerateProjectFormValues } from './utils/use-generate-form';

export const TemplatePlaceholderInputItem: FC<{
  field: ControllerRenderProps<GenerateProjectFormValues, string>;
  placeholder: TemplatePlaceholder;
}> = ({ placeholder, field }) => {
  const isRequired = useMemo(
    () =>
      placeholder.validators === undefined ||
      !!placeholder.validators.find(
        (validator) => validator.pattern !== 'optional'
      ),
    [placeholder.name]
  );

  return (
    <>
      {placeholder.type === 'TEXT' && (
        <Input
          required={isRequired}
          placeholder={placeholder.label}
          {...field}
        />
      )}
      {placeholder.type === 'SELECT' && (
        <Select
          required={isRequired}
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {placeholder.choices?.map((choice) => (
              <SelectItem key={choice} value={choice}>
                {choice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {placeholder.type === 'BOOLEAN' && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={placeholder.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={placeholder.name} className="text-sm">
            {placeholder.label}
          </label>
        </div>
      )}
    </>
  );
};
