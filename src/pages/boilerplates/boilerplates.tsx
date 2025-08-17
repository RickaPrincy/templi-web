import { motion } from 'framer-motion';
import { FileText, FolderTree, Info, Search } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import {
  GenerateFromUrl,
  GithubIcon,
  Navigation,
  SubmitYourTemplate,
} from '@/common/components';
import { BoilerplateItem } from './components/boilereplate-item';
import { useGetList } from '@/common/hooks/providers';
import { templateProvider } from '@/providers';
import { FC, useEffect } from 'react';
import { useTemplateStore } from '@/common/stores';
import { generateProjectCache } from '@/common/utils/generate-project-cache';

const STATIC_TAG_FILTER = [
  'backend',
  'cmake',
  'cpp',
  'express',
  'java',
  'javascript',
  'jpa',
  'library',
  'nestjs',
  'node',
];

type TagFilterProps = {
  tags: string[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
};

export const TagFilter: FC<TagFilterProps> = ({ tags, selected, onChange }) => {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-5">
      {tags.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`rounded-full border px-3 py-[6px] text-sm transition ${
              isSelected
                ? 'border-primary bg-primary text-white shadow'
                : 'border-muted text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export const Boilerplates = () => {
  const setTemplate = useTemplateStore((state) => state.setTemplate);
  const {
    isLoading,
    data: templates,
    filter,
    setFilter,
  } = useGetList({
    queryKey: ['templates'],
    queryFn: ({ pagination, filter }) =>
      templateProvider.getTemplates({ filter: filter as any, pagination }),
  });

  useEffect(() => {
    if (generateProjectCache.isPresent()) {
      setTemplate(generateProjectCache.get().template);
    }
  }, [generateProjectCache.isPresent()]);

  return (
    <div className="min-h-screen mb-10">
      <Navigation />
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8 gap-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Boilerplate Templates
            </h1>
            <SubmitYourTemplate />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How to Use Templates With Github</CardTitle>
              <CardDescription>
                Templates allow you to quickly scaffold new projects with
                predefined structures and configurations using github directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span>
                    Browse the templates below and click "Use Template" to
                    generate a new project.
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <GithubIcon
                      style={{ width: '30px', marginBottom: '8px' }}
                    />
                    <h3 className="font-medium text-center">
                      Sign in with GitHub
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Authentication is required to use templates
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">
                      Customize Your Template
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Fill in any required fields or parameters for your new
                      project.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <FolderTree className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">Done</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      A new project has been created in your account based on
                      the template you selected."**
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-9"
                value={filter?.name}
                onChange={(e) => setFilter({ name: e.target.value })}
              />
            </div>
            <GenerateFromUrl />
          </div>
          <TagFilter
            tags={STATIC_TAG_FILTER}
            selected={filter?.tags ?? []}
            onChange={(newTags) =>
              setFilter((f) => ({
                ...f,
                tags: newTags,
              }))
            }
          />
          {isLoading && (
            <div className="w-full h-[4px] overflow-hidden rounded-md mb-5 bg-blue-800">
              <div className="h-full w-full animate-pulse bg-blue-50" />
            </div>
          )}

          {templates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No templates found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {templates.map((template) => (
                <BoilerplateItem key={template.id} template={template} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
