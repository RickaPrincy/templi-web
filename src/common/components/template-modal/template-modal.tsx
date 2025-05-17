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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Checkbox } from '@/common/components/ui/checkbox';
import { GithubIcon } from '../github-icon';
import { TemplatePlaceHoldersInputs } from './template-placeholders-inputs';
import { GenerateWithPersistedTemplate } from '@/gen/templi-web-api-client';
import { useTemplateStore } from '../../stores';
import { useWhoami } from '@/security/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { githubInstallationProvider, templateProvider } from '@/providers';
import { useToast } from '../ui/use-toast';
import { Env } from '@/config/env';

export type GenerateProjectFormValues = {
  repositoryName: string;
  installationId: string;
  isPrivateRepository: boolean;
  [key: string]: any;
};

export function TemplateModal() {
  const whoami = useWhoami();
  const { toast } = useToast();
  const [isGenerationLoading, setIsGenerationLoading] = useState(false);
  const { template, setTemplate } = useTemplateStore();

  const { data: installations } = useQuery({
    queryFn: () =>
      githubInstallationProvider.findAll({ meta: { userId: whoami?.id! } }),
    queryKey: ['installations', JSON.stringify(whoami)],
  });

  const { mutateAsync: generateProject } = useMutation({
    mutationFn: (data: GenerateWithPersistedTemplate) =>
      templateProvider.generateWithTemplate({
        meta: { templateId: template.id },
        payload: data,
      }),
    mutationKey: ['templates'],
  });

  const form = useForm<GenerateProjectFormValues>({
    defaultValues: {
      repositoryName: '',
      installationId: '',
      isPrivateRepository: true,
    },
  });

  const onSubmit = async (formValues: GenerateProjectFormValues) => {
    const {
      isPrivateRepository: isPrivate,
      installationId,
      repositoryName,
      ...values
    } = formValues;
    try {
      setIsGenerationLoading(true);
      await generateProject({
        isPrivate,
        installationId,
        repositoryName,
        values: Object.entries(values).map(([name, value]) => ({
          name,
          value,
        })),
      });
      toast({
        title: 'Project generated for the specified Org/Account',
        className: 'text-green-500',
      });
      setTemplate(null);
    } catch {
      toast({
        title: 'Error occured when try to generate your project',
        className: 'text-red-500',
      });
    } finally {
      setIsGenerationLoading(false);
    }
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
              name="repositoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Name</FormLabel>
                  <FormControl>
                    <Input placeholder="my-project" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="installationId"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an installation" />
                    </SelectTrigger>
                    <SelectContent>
                      {installations?.map((installation) => (
                        <SelectItem
                          key={installation.id}
                          value={installation.id}
                        >
                          {installation.orgName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Button
                type="button"
                onClick={() =>
                  (window.location.href = `https://github.com/apps/${Env.GITHUB_APP_NAME}/installations/new`)
                }
                className="flex items-center gap-2"
              >
                <GithubIcon reverse />
                Install GitHub Org/Account
              </Button>
            </div>
            <FormField
              control={form.control}
              name="isPrivateRepository"
              render={({ field }) => (
                <FormItem className="flex flex-row items-end space-x-2 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange.bind(field)}
                    />
                  </FormControl>
                  <FormLabel>Private Repository</FormLabel>
                </FormItem>
              )}
            />
            <TemplatePlaceHoldersInputs />
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                disabled={isGenerationLoading}
                onClick={() => setTemplate(null)}
              >
                Cancel
              </Button>
              <Button
                disabled={isGenerationLoading}
                type="submit"
                className="flex items-center gap-2"
              >
                <GithubIcon reverse />
                Generate Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
