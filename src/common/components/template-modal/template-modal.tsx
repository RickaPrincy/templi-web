import { FC, useState } from 'react';
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
import {
  GenerateProjectPayload,
  GenerateWithPersistedTemplate,
} from '@/gen/templi-web-api-client';
import { Env } from '@/config/env';
import { useTemplateStore } from '../../stores';
import { useWhoami } from '@/security/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { githubInstallationProvider, templateProvider } from '@/providers';
import { useToast } from '../ui/use-toast';
import { useGetConfiguration } from '@/common/hooks/providers';
import { TempliLoader } from '../loader';
import { TemplateConfig } from '@/common/utils/types';
import {
  GenerateProjectFormValues,
  useGenerateForm,
} from './utils/use-generate-form';

export const TemplateModal = () => {
  const { template, setTemplate } = useTemplateStore();
  const { data: templateConfig, isLoading: isConfigurationLoading } =
    useGetConfiguration(template);

  return (
    <Dialog open={Boolean(template)} onOpenChange={() => setTemplate(null)}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate {template?.name} Project</DialogTitle>
          <DialogDescription>
            Configure your new project based on this template.
          </DialogDescription>
        </DialogHeader>
        {isConfigurationLoading ? (
          <TempliLoader />
        ) : (
          <TemplateModalContent templateConfig={templateConfig} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const TemplateModalContent: FC<{ templateConfig: TemplateConfig }> = ({
  templateConfig,
}) => {
  const whoami = useWhoami();
  const { toast } = useToast();
  const [isGenerationLoading, setIsGenerationLoading] = useState(false);
  const { template, isPersisted, setTemplate } = useTemplateStore();

  const { data: installations } = useQuery({
    queryFn: () =>
      githubInstallationProvider.findAll({ meta: { userId: whoami?.id! } }),
    queryKey: ['installations', JSON.stringify(whoami)],
  });

  const { mutateAsync: generateProjectWithTemplate } = useMutation({
    mutationFn: (data: GenerateWithPersistedTemplate) =>
      templateProvider.generateWithTemplate({
        meta: { templateId: template.id },
        payload: data,
      }),
    mutationKey: ['templates'],
  });

  const { mutateAsync: generateProject } = useMutation({
    mutationFn: (data: GenerateProjectPayload) =>
      templateProvider.generateProject({ payload: data }),
    mutationKey: ['templates'],
  });

  const form = useGenerateForm(templateConfig);

  const generate = async (formValues: GenerateProjectFormValues) => {
    const {
      isPrivateRepository: isPrivate,
      installationId,
      repositoryName,
      ...values
    } = formValues;

    if (!isPersisted) {
      const response = await generateProjectWithTemplate({
        isPrivate,
        installationId,
        repositoryName,
        values: Object.entries(values).map(([name, value]) => ({
          name,
          value: value === undefined || value === null ? '' : value,
        })),
      });
      return window.open(response?.url, '_blank');
    }

    const response = await generateProject({
      scope: template.scope,
      templateUrl: template.url,
      isPrivate,
      installationId,
      repositoryName,
      values: Object.entries(values).map(([name, value]) => ({
        name,
        value: value === undefined || value === null ? '' : value,
      })),
    });
    return window.open(response?.url, '_blank');
  };

  const onSubmit = async (formValues: GenerateProjectFormValues) => {
    try {
      console.log('formValues', formValues);
      setIsGenerationLoading(true);
      await generate(formValues);
      toast({
        title: 'Project generated for the selected Org/Account',
        className: 'bg-green-500 text-white',
      });
      setTemplate(null);
    } catch {
      toast({
        title: 'Error occurred while trying to generate your project',
        className: 'text-white bg-red-500',
      });
    } finally {
      setIsGenerationLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="repositoryName"
          render={({ field, formState: { errors = {} } }) => (
            <FormItem>
              <FormLabel>Repository Name</FormLabel>
              <FormControl>
                <Input required placeholder="my-project" {...field} />
              </FormControl>
              {errors[field.name] && (
                <p className="text-red-500">
                  {errors[field.name].message.toString()}
                </p>
              )}
            </FormItem>
          )}
        />
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="installationId"
            render={({ field }) => (
              <Select
                required
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an installation" />
                </SelectTrigger>
                <SelectContent>
                  {installations?.map((installation) => (
                    <SelectItem key={installation.id} value={installation.id}>
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
              (window.location.href = `https://github.com/apps/${Env.GITHUB_APP_NAME}/installations/new?redirect_uri=${Env.API_URL}/auth/github/callback`)
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
        <TemplatePlaceHoldersInputs templateConfig={templateConfig} />
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
  );
};
