import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/common/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTemplateStore } from '../stores';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { GithubIcon } from './github-icon';
import { Template } from '@/gen/templi-web-api-client';

type FormValue = {
  scope?: string;
  url: string;
};

export const GenerateFromUrl = () => {
  const [open, setOpen] = useState(false);
  const setTemplate = useTemplateStore((state) => state.setTemplate);
  const form = useForm<FormValue>({
    defaultValues: {
      scope: '',
      url: '',
    },
  });

  const onSubmit = (formValue: FormValue) => {
    setOpen(false);
    setTemplate(
      {
        ...formValue,
        name: formValue.url,
        id: 'CUSTOM-TEMPLATE',
        description: 'Custom Template',
      } as Template,
      false
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Generate From Url
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate a project from Template URL</DialogTitle>
            <DialogDescription>
              Enter the repository URL of the template you want to use (and
              optionally the scope if it's a monorepo).
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="url"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Url</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="https://github.com/RickaPrincy/templi-express-js"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope</FormLabel>
                    <FormControl>
                      <Input placeholder="scope" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <GithubIcon reverse />
                  Use Template
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
