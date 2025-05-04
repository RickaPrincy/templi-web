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
} from '@/common/components/ui/form';
import { Checkbox } from '@/common/components/ui/checkbox';
import { GithubIcon } from '../github-icon';
import { TemplateKeyInput } from './template-key-input';
import { useTemplateStore } from '../../stores';

export type FormValues = {
  name: string;
  isPrivate: boolean;
  [key: string]: any;
};

export function TemplateModal() {
  const { template, setTemplate } = useTemplateStore();
  const form = useForm<FormValues>({
    defaultValues: { name: '', isPrivate: true },
  });

  const onSubmit = async (values: FormValues) => {
    console.log('values', values);
  };

  return (
    <Dialog open={Boolean(template)} onOpenChange={() => setTemplate(null)}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate {template?.name} Project</DialogTitle>
          <DialogDescription>
            Configure your new project based on this template.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Name</FormLabel>
                  <FormControl>
                    <Input placeholder="my-project" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-end space-x-2 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Private Repository</FormLabel>
                </FormItem>
              )}
            />

            {template?.config &&
              template?.config.keys.map((keyvalue) => (
                <FormField
                  key={keyvalue.name}
                  control={form.control}
                  name={keyvalue.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {keyvalue.label}{' '}
                        {keyvalue.required && (
                          <span className="text-gray-500">Optional</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <TemplateKeyInput keyvalue={keyvalue} field={field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setTemplate(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <GithubIcon theme="dark" />
                Generate Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
