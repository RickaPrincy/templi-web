import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as LinkIcon, ArrowLeft } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';
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
import { Badge } from '@/common/components/ui/badge';
import { Navigation, GithubIcon, CodeBlock } from '@/common/components';
import { TEMPLATES } from '@/common/constants/templates';

export const BoilerplateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [_, setActiveTab] = useState('overview');

  const template = TEMPLATES.find((t) => t.id === id);

  const handleUseTemplate = () => {
    //TODO:
  };

  if (!template) {
    return <Navigate to="/boilerplates" />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/boilerplates')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Boilerplates
          </Button>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {template.name}
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
              <div className="flex flex-wrap gap-1 mt-2">
                {template.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
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
                      Object.entries(template.structure).map(([path, desc]) => (
                        <div
                          key={path}
                          className="flex justify-between text-sm"
                        >
                          <code className="font-mono">{path}</code>
                          <span className="text-muted-foreground">{desc}</span>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="command" className="py-4">
                  <CodeBlock language="bash" code={template.command} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handleUseTemplate}
                className="w-full flex items-center gap-2"
              >
                <GithubIcon theme="dark" />
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

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              How to Use This Template
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong>Install Templi</strong>
                    <p>
                      Before using this template, make sure you have Templi
                      installed.
                    </p>
                  </li>
                  <li>
                    <strong>Generate the Project</strong>
                    <p>Run the following command to generate the project:</p>
                    <CodeBlock language="bash" code={template.command} />
                  </li>
                  <li>
                    <strong>Navigate and Run</strong>
                    <p>
                      After generation, navigate to the project directory and
                      start it:
                    </p>
                    <CodeBlock
                      language="bash"
                      code={`cd ~/${template.name.toLowerCase().replace(/\s+/g, '-')}\nnpm start`}
                    />
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
