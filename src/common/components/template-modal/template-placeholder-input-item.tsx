import { FC } from 'react';
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
  return (
    <>
      {placeholder.type === 'TEXT' && (
        <Input placeholder={placeholder.label} {...field} />
      )}
      {placeholder.type === 'SELECT' && (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
