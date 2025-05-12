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
import { GithubIcon, Navigation } from '@/common/components';
import { BoilerplateItem } from './components/boilereplate-item';
import { useGetList } from '@/common/hooks/providers';
import { resourcesProvider } from '@/providers/resources-provider';

export const Boilerplates = () => {
  const {
    data: templates,
    filter,
    setFilter,
  } = useGetList({
    queryKey: ['templates'],
    queryFn: ({ pagination, filter }) =>
      resourcesProvider.getTemplates(filter, pagination),
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Boilerplate Templates
          </h1>

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
          </div>

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
