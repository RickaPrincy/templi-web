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
import { GenerateTemplate } from '@/gen/templi-web-api-client';
import { TemplateKeyInput } from './template-key-input';
import { useTemplateStore } from '../../stores';
import { useGetConfiguration } from '@/common/hooks/providers';
import { useWhoami } from '@/security/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { resourcesProvider } from '@/providers/resources-provider';
import { Env } from '@/config/env';

export type FormValues = {
  repositoryName: string;
  installationId: string;
  isPrivateRepository: boolean;
  [key: string]: any;
};

export function TemplateModal() {
  const whoami = useWhoami();
  const { template, setTemplate } = useTemplateStore();
  const { data: config } = useGetConfiguration(template);
  const { data: installations } = useQuery({
    queryFn: () =>
      resourcesProvider.getInstallationId(
        { userId: whoami?.id },
        { page: 1, pageSize: 10 }
      ),
    queryKey: ['installations'],
  });
  const { mutateAsync: generateProject, error } = useMutation({
    mutationFn: (data: GenerateTemplate) =>
      resourcesProvider.generateWithTemplate(data, { templateId: template.id }),
    mutationKey: ['templates'],
  });

  const form = useForm<FormValues>({
    defaultValues: {
      repositoryName: '',
      installationId: '',
      isPrivateRepository: true,
    },
  });

  const onSubmit = async (formValues: FormValues) => {
    const {
      isPrivateRepository: isPrivate,
      installationId,
      repositoryName,
      ...values
    } = formValues;
    await generateProject({
      isPrivate,
      installationId,
      repositoryName,
      values: Object.entries(values).map(([name, value]) => ({ name, value })),
    });
    setTemplate(null);
  };
  console.log(error);

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
                <GithubIcon theme="dark" />
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
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Private Repository</FormLabel>
                </FormItem>
              )}
            />
            {config &&
              config.keys.map((keyvalue) => (
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
