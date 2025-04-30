import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Easy Configuration',
    description:
      "Generate templi.json easily with the CLI command 'templi configure' to set up your boilerplate configuration.",
  },
  {
    title: 'Dynamic Templates',
    description:
      'Use {{placeholders}} in your files for dynamic values that can be replaced during generation.',
  },
  {
    title: 'CLI & Library Support',
    description:
      'Use Templi as a CLI tool for quick scaffolding or integrate it as a library in your C++ applications.',
  },
  {
    title: 'Flexible Output',
    description:
      'Generate projects with custom output paths and exclude specific files from template processing.',
  },
];

export const Features = () => {
  return (
    <section className="container px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Everything you need to streamline your workflow
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group hover:shadow-lg transition-all duration-300 hover:border-blue-500/20"
          >
            <CardHeader>
              <CardTitle className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
