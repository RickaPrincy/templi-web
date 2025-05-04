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
import { useTemplateStore } from '@/common/stores';
import { useGenerator } from '@/common/hooks/use-generator';

export const BoilerplateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setTemplate = useTemplateStore((state) => state.setTemplate);

  const template = TEMPLATES.find((t) => t.id === id);
  const generator = useGenerator(template);

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
              <Tabs defaultValue="overview" className="w-full">
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
                  <CodeBlock language="bash" code={generator.generate()} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-2">
              <Button
                onClick={() => setTemplate(template)}
                className="w-full flex items-center gap-2"
              >
                <GithubIcon theme="dark" />
                Use Template
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={generator.linkUrl()}
                  target="_blank"
                  className="w-full flex items-center gap-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};
