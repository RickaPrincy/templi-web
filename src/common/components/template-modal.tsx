import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/common/components/ui/dialog';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/common/components/ui/form';
import { Textarea } from '@/common/components/ui/textarea';
import { Checkbox } from '@/common/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { GithubIcon } from './github-icon';
import { useTemplateStore } from '../stores';

type FormValues = {
  repositoryName: string;
  isPrivate: boolean;
  [key: string]: any;
};

export function TemplateModal() {
  const template = useTemplateStore((state) => state.template);
  const setTemplate = useTemplateStore((state) => state.setTemplate);

  if (!template) {
    return null;
  }

  const defaultValues: FormValues = {
    repositoryName: `my-${template?.name.toLowerCase().replace(/\s+/g, '-')}`,
    isPrivate: false,
  };

  if (template) {
    template.config.keys.forEach((key) => {
      if (key.default !== undefined) {
        defaultValues[key.name] = key.default;
      } else if (key.type === 'INPUT' || key.type === 'SELECT') {
        defaultValues[key.name] = '';
      } else if (key.type === 'BOOLEAN') {
        defaultValues[key.name] = false;
      }
    });
  }

  const form = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (_values: FormValues) => {};

  // Build command preview
  const buildCommand = () => {
    const repoName = form.watch('repositoryName');
    let command = `templi generate -t ${template?.repoUrl}`;
    if (template.path) {
      command += ` -p ${template?.path}`;
    }
    command += ` -o ~/${repoName}`;

    // Add dynamic flags based on form values if we have a config
    if (template.config) {
      template.config.keys.forEach((key) => {
        const value = form.watch(key.name);
        if (value !== undefined && value !== '') {
          if (key.type === 'BOOLEAN') {
            if (value === true) {
              command += ` --${key.name}`;
            }
          } else {
            command += ` --${key.name}="${value}"`;
          }
        }
      });
    }

    return command;
  };

  return (
    <Dialog open={Boolean(template)} onOpenChange={() => setTemplate(null)}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate {template?.name} Project</DialogTitle>
          <DialogDescription>
            Configure your new project based on this template.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="repositoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository Name</FormLabel>
                    <FormControl>
                      <Input placeholder="my-project" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your new repository
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-2 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Private Repository</FormLabel>
                      <FormDescription>
                        Make this repository private
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {template?.config &&
              template?.config.keys.map((key) => (
                <FormField
                  key={key.name}
                  control={form.control}
                  name={key.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.label}</FormLabel>
                      <FormControl>
                        {key.type === 'INPUT' &&
                          (key.name === 'description' ? (
                            <Textarea placeholder={key.label} {...field} />
                          ) : (
                            <Input placeholder={key.label} {...field} />
                          ))}
                        {key.type === 'SELECT' && (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {key.choices?.map((choice) => (
                                <SelectItem key={choice} value={choice}>
                                  {choice}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {key.type === 'BOOLEAN' && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={key.name}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label htmlFor={key.name} className="text-sm">
                              Enable {key.label}
                            </label>
                          </div>
                        )}
                      </FormControl>
                      {key.required === false && (
                        <FormDescription>Optional</FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              ))}

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Command Preview</h3>
              <div className="bg-slate-950 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
                {buildCommand()}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <GithubIcon />
                Generate Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
