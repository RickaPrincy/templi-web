import { useParams, useNavigate } from 'react-router-dom';
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
import {
  Navigation,
  GithubIcon,
  CodeBlock,
  TempliLoader,
  AuthenticationRequired,
} from '@/common/components';
import { useTemplateStore } from '@/common/stores';
import { useGenerator } from '@/common/hooks/use-generator';
import { useQuery } from '@tanstack/react-query';
import { templateProvider } from '@/providers';
import { useGetConfiguration } from '@/common/hooks/providers';

export const BoilerplateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setTemplate = useTemplateStore((state) => state.setTemplate);

  const { data: template, isLoading } = useQuery({
    queryKey: ['templates', id],
    queryFn: () => templateProvider.getTemplateById(id),
  });
  const generator = useGenerator(template);
  const { data: config, isLoading: isConfigurationLoading } =
    useGetConfiguration(template);

  if (isLoading) {
    return <TempliLoader />;
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
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
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
                          {isConfigurationLoading ? (
                            <TempliLoader />
                          ) : (
                            JSON.stringify(config, null, 2)
                          )}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="command" className="py-4">
                  <CodeBlock language="bash" code={generator.generate()} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-2">
              <AuthenticationRequired
                handleClick={() => setTemplate(template)}
                render={(handleClick) => (
                  <Button
                    onClick={handleClick}
                    className="w-full flex items-center gap-2"
                  >
                    <GithubIcon reverse />
                    Use Template
                  </Button>
                )}
              />
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
