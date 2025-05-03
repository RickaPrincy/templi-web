import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';
import { Link as LinkIcon, FileText, FolderTree, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/components/ui/accordion';
import { GithubIcon, CodeBlock, Navigation } from '@/common/components';
import { useTemplateStore } from '@/common/stores';
import { TEMPLATES } from '@/common/constants/templates';

export const Examples = () => {
  const [_, setActiveTab] = useState('overview');
  const setTemplate = useTemplateStore((state) => state.setTemplate);

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
            Template Examples
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How to Use Templates</CardTitle>
              <CardDescription>
                Templates allow you to quickly scaffold new projects with
                predefined structures and configurations.
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
                      style={{ fontSize: '30px', marginBottom: '5px' }}
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
                      Configure Template
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Customize parameters in the template
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <FolderTree className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">
                      Generate Project
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Create a new repository from template
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {TEMPLATES.map((template) => (
              <Card
                key={template.name}
                className="transition-all duration-300 hover:shadow-md flex flex-col"
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Tabs
                    defaultValue="overview"
                    className="w-full"
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="structure">Structure</TabsTrigger>
                      <TabsTrigger value="command">Command</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="py-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description} This template provides a solid
                        foundation for building {template.name.split(' ')[0]}{' '}
                        applications.
                      </p>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="config">
                          <AccordionTrigger className="text-sm">
                            View Template Configuration
                          </AccordionTrigger>
                          <AccordionContent className="bg-slate-100 dark:bg-slate-900 p-2 rounded">
                            <pre className="text-xs overflow-x-auto">
                              {JSON.stringify(template.config, null, 2)}
                            </pre>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>
                    <TabsContent value="structure" className="py-4">
                      <div className="space-y-2">
                        {template.structure &&
                          Object.entries(template.structure).map(
                            ([path, desc]) => (
                              <div
                                key={path}
                                className="flex justify-between text-sm"
                              >
                                <code className="font-mono">{path}</code>
                                <span className="text-muted-foreground">
                                  {desc}
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    </TabsContent>
                    <TabsContent value="command" className="py-4">
                      <CodeBlock language="bash" code={template.command} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-2">
                  <Button
                    onClick={() => setTemplate(template)}
                    className="w-full flex items-center gap-2"
                  >
                    <GithubIcon />
                    Use Template
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={
                        template.path
                          ? `${template.repoUrl.replace('.git', '')}/tree/main${template.path}`
                          : template.repoUrl.replace('.git', '')
                      }
                      target="_blank"
                      className="w-full flex items-center gap-2"
                    >
                      <LinkIcon className="h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Example Boilerplate Usage
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong>Install Templi</strong>
                    <p>
                      Before using this boilerplate, make sure you have Templi
                      installed.
                    </p>
                  </li>
                  <li>
                    <strong>Generate the Project</strong>
                    <p>Run the following command to generate the project:</p>
                    <CodeBlock
                      language="bash"
                      code="templi generate -t https://github.com/RickaPrincy/templi-express-js.git -o ~/myproject"
                    />
                  </li>
                  <li>
                    <strong>Navigate and Run</strong>
                    <p>
                      After generation, navigate to the project directory and
                      start it:
                    </p>
                    <CodeBlock
                      language="bash"
                      code="cd ~/myproject\nnpm start"
                    />
                  </li>
                </ol>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Example Output</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <img
                      src="/lovable-uploads/1148d55d-1d22-4078-b146-4f452db89e3b.png"
                      alt="Templi Output 1"
                      className="rounded-lg shadow-md"
                    />
                    <img
                      src="/lovable-uploads/951dc1e2-40af-46d5-865c-3ce46b219c04.png"
                      alt="Templi Output 2"
                      className="rounded-lg shadow-md"
                    />
                    <img
                      src="/lovable-uploads/9a662493-d3d1-4c5a-89f6-196d9dc434b1.png"
                      alt="Templi Output 3"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
