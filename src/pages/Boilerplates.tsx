
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import CodeBlock from "@/components/documentation/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Link as LinkIcon, FileText, FolderTree, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { TemplateModal } from "@/components/examples/TemplateModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Template = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  path?: string;
  command: string;
  templateJson: any;
  structure?: { [key: string]: string };
  categories: string[];
};

const Boilerplates = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const templateConfig = {
    excludes: [
      ".git",
      "images",
      ".env.template",
      "README.md",
      "templi.json"
    ],
    scripts: {
      before: [],
      after: [
        "cd {{TEMPLI_OUTPUT_FOLDER}}; npm install; rm -rf .git; git init . ; git add --all; git commit -m \"chore: init project with templi\""
      ]
    },
    keys: [
      {
        label: "Application name:",
        name: "app_name",
        type: "INPUT"
      },
      {
        label: "Author name:",
        name: "author",
        type: "INPUT"
      },
      {
        label: "Project description:",
        name: "description",
        type: "INPUT",
        clean: false,
        required: false
      },
      {
        label: "Select license:",
        name: "license",
        type: "SELECT",
        choices: [
          "MIT",
          "ISC"
        ]
      },
      {
        label: "Is it private?",
        name: "private",
        type: "BOOLEAN",
        default: false
      },
      {
        label: "Version number:",
        name: "version",
        type: "INPUT"
      }
    ]
  };

  const templates: Template[] = [
    {
      id: "express-js",
      name: "Express.js Template",
      description: "A modern Express.js application template with TypeScript support.",
      repoUrl: "https://github.com/RickaPrincy/templi-express-js.git",
      command: "templi generate -t https://github.com/RickaPrincy/templi-express-js.git -o ~/myproject",
      templateJson: templateConfig,
      structure: {
        "src/": "Source code directory",
        "src/controllers/": "API controllers",
        "src/routes/": "Express route definitions",
        "src/models/": "Data models",
        "src/middleware/": "Express middleware",
        "config/": "Application configuration",
        "tests/": "Unit and integration tests"
      },
      categories: ["JavaScript", "Node.js", "TypeScript", "API"]
    },
    {
      id: "poja-cli",
      name: "Poja CLI Template",
      description: "A modern CLI application template using Poja.",
      repoUrl: "https://github.com/RickaPrincy/templi-templates.git",
      path: "/poja-cli",
      command: "templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /poja-cli -o ~/poja-std22052",
      templateJson: templateConfig,
      structure: {
        "src/": "Source code directory",
        "bin/": "CLI executable scripts",
        "lib/": "Core library functions",
        "docs/": "Documentation",
        "tests/": "Test suite",
      },
      categories: ["Java", "CLI", "Spring"]
    },
    {
      id: "cpp-library",
      name: "C++ Library Template",
      description: "A template for creating C++ libraries with modern CMake.",
      repoUrl: "https://github.com/RickaPrincy/templi-templates.git",
      path: "/libc++",
      command: "templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /libc++ -o ~/libc++",
      templateJson: templateConfig,
      structure: {
        "include/": "Public headers",
        "src/": "Implementation source files",
        "test/": "Test suite using GoogleTest",
        "examples/": "Example usages",
        "cmake/": "CMake modules",
        "docs/": "Documentation",
      },
      categories: ["C++", "Library", "CMake"]
    },
    {
      id: "react-app",
      name: "React Application",
      description: "A modern React application with Vite and TypeScript.",
      repoUrl: "https://github.com/RickaPrincy/templi-templates.git",
      path: "/react-app",
      command: "templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /react-app -o ~/my-react-app",
      templateJson: templateConfig,
      structure: {
        "src/": "Source code directory",
        "src/components/": "React components",
        "src/hooks/": "Custom React hooks",
        "src/pages/": "Page components",
        "public/": "Public assets",
        "index.html": "HTML entry point",
      },
      categories: ["JavaScript", "React", "TypeScript", "Frontend"]
    },
    {
      id: "python-package",
      name: "Python Package",
      description: "A template for creating Python packages with modern tooling.",
      repoUrl: "https://github.com/RickaPrincy/templi-templates.git",
      path: "/python-package",
      command: "templi generate -t https://github.com/RickaPrincy/templi-templates.git -p /python-package -o ~/my-python-package",
      templateJson: templateConfig,
      structure: {
        "src/": "Source code directory",
        "tests/": "Test suite",
        "docs/": "Documentation",
        "examples/": "Example usage",
        "setup.py": "Package setup script",
        "pyproject.toml": "Project configuration",
      },
      categories: ["Python", "Package", "CLI"]
    },
  ];

  // Get all unique categories
  const allCategories = Array.from(
    new Set(templates.flatMap(template => template.categories))
  ).sort();

  const handleUseTemplate = (template: Template) => {
    if (user) {
      setSelectedTemplate(template);
      setIsModalOpen(true);
    } else {
      login();
    }
  };

  const handleCardClick = (template: Template) => {
    navigate(`/boilerplates/${template.id}`);
  };

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === null || 
      template.categories.includes(activeCategory);
      
    return matchesSearch && matchesCategory;
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
              <CardTitle>How to Use Templates</CardTitle>
              <CardDescription>
                Templates allow you to quickly scaffold new projects with predefined structures and configurations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span>Browse the templates below and click "Use Template" to generate a new project.</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Github className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">Sign in with GitHub</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Authentication is required to use templates
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">Configure Template</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Customize parameters in the template
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <FolderTree className="h-8 w-8 mb-2" />
                    <h3 className="font-medium text-center">Generate Project</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Create a new repository from template
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Filter by:</span>
              <Badge 
                variant={activeCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Badge>
              {allCategories.map(category => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No templates found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className="transition-all duration-300 hover:shadow-md flex flex-col cursor-pointer"
                  onClick={() => handleCardClick(template)}
                >
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.categories.map(category => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="structure">Structure</TabsTrigger>
                        <TabsTrigger value="command">Command</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="py-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description} This template provides a solid foundation for building {template.name.split(" ")[0]} applications.
                        </p>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="config">
                            <AccordionTrigger className="text-sm">View Template Configuration</AccordionTrigger>
                            <AccordionContent className="bg-slate-100 dark:bg-slate-900 p-2 rounded">
                              <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(template.templateJson, null, 2)}
                              </pre>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TabsContent>
                      <TabsContent value="structure" className="py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-2">
                          {template.structure && Object.entries(template.structure).map(([path, desc]) => (
                            <div key={path} className="flex justify-between text-sm">
                              <code className="font-mono">{path}</code>
                              <span className="text-muted-foreground">{desc}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="command" className="py-4" onClick={(e) => e.stopPropagation()}>
                        <CodeBlock
                          language="bash"
                          code={template.command}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template);
                      }}
                      className="w-full flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Use Template
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={template.path 
                          ? `${template.repoUrl.replace('.git', '')}/tree/main${template.path}`
                          : template.repoUrl.replace('.git', '')
                        } 
                        target="_blank"
                        className="w-full flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkIcon className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Example Boilerplate Usage</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong>Install Templi</strong>
                    <p>Before using this boilerplate, make sure you have Templi installed.</p>
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
                    <p>After generation, navigate to the project directory and start it:</p>
                    <CodeBlock
                      language="bash"
                      code="cd ~/myproject\nnpm start"
                    />
                  </li>
                </ol>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Example Output</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <img src="/lovable-uploads/1148d55d-1d22-4078-b146-4f452db89e3b.png" alt="Templi Output 1" className="rounded-lg shadow-md" />
                    <img src="/lovable-uploads/951dc1e2-40af-46d5-865c-3ce46b219c04.png" alt="Templi Output 2" className="rounded-lg shadow-md" />
                    <img src="/lovable-uploads/9a662493-d3d1-4c5a-89f6-196d9dc434b1.png" alt="Templi Output 3" className="rounded-lg shadow-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      {selectedTemplate && (
        <TemplateModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          templateName={selectedTemplate.name}
          templateUrl={selectedTemplate.repoUrl}
          templatePath={selectedTemplate.path}
          templateConfig={selectedTemplate.templateJson}
        />
      )}
    </div>
  );
};

export default Boilerplates;
