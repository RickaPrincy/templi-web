import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Input } from '@/common/components/ui/input';
import { Checkbox } from '@/common/components/ui/checkbox';
import { TemplateKey } from '@/common/utils/types';
import { FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FormValues } from './template-modal';

export const TemplateKeyInput: FC<{
  field: ControllerRenderProps<FormValues, string>;
  keyvalue: TemplateKey;
}> = ({ keyvalue, field }) => {
  return (
    <>
      {keyvalue.type === 'INPUT' && (
        <Input
          required={keyvalue.required}
          placeholder={keyvalue.label}
          {...field}
        />
      )}
      {keyvalue.type === 'SELECT' && (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {keyvalue.choices?.map((choice) => (
              <SelectItem key={choice} value={choice}>
                {choice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {keyvalue.type === 'BOOLEAN' && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={keyvalue.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={keyvalue.name} className="text-sm">
            {keyvalue.label}
          </label>
        </div>
      )}
    </>
  );
};
