import { useState } from 'react';
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
import { useToast } from '@/common/components/ui/use-toast';
import { GithubIcon } from './github-icon';
import { AuthenticationRequired } from './authentication-required';
import { emailjsProvider, securityApi } from '@/providers';
import { useWhoami } from '@/security/hooks';
import { unwrap } from '../utils/unwrap';

export type SubmitBoilerplateForm = {
  template_url: string;
  template_name: string;
  template_description: string;
  user_message: string;
  user_email: string;
  tag_1: string;
  tag_2: string;
  tag_3: string;
};

export const SubmitYourTemplate = () => {
  const whoami = useWhoami();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubmitBoilerplateForm>({
    defaultValues: {
      template_url: '',
      template_name: '',
      template_description: '',
      tag_1: '',
      tag_2: '',
      tag_3: '',
      user_email: whoami?.email ?? '',
      user_message: '',
    },
  });

  const onSubmit = async (values: SubmitBoilerplateForm) => {
    try {
      // Try whoami to test if it's a valid user
      // Note: it still fails if there's an interceptor on getWhoami.
      // However, it takes a little time and works,
      // so we'll keep it here for now.
      const connectedWhoami = await unwrap(() => securityApi().whoami());
      await emailjsProvider.send({
        ...values,
        user_id: connectedWhoami?.id,
        user_name: connectedWhoami?.name,
        user_email: connectedWhoami?.email,
      });
      toast({
        title: 'Boilerplate submitted successfully!',
        className: 'bg-green-500 text-white',
      });
      setOpen(false);
    } catch {
      toast({
        title: 'Failed to submit package.',
        className: 'bg-red-500 text-white',
      });
    }
  };

  return (
    <>
      <AuthenticationRequired
        handleClick={() => setOpen(true)}
        render={(handleClick) => (
          <Button onClick={handleClick} className="flex items-center gap-2">
            <GithubIcon reverse /> Submit a Boilerplate
          </Button>
        )}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit a New Template</DialogTitle>
            <DialogDescription>
              Fill in the following fields to submit a new template package.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="template_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template URL</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="https://github.com/username/repo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="template_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="My Template" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="template_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Description</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Short description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Short description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        multiple
                        placeholder="Short Message To Us"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="tag_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag 1</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. react" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag_2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag 2</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. typescript" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag_3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag 3</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. web" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <GithubIcon reverse /> Submit Boilerplate
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
