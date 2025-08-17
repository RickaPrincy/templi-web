import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';

const features = [
  {
    title: 'Configure Once',
    description:
      'Set up a project with all your preferred tools (React, Vite, Tailwind, ESLint, Prettier, etc.) just once and use it as a template for future projects.',
  },
  {
    title: 'Dynamic Placeholders',
    description:
      'Use {{placeholders}} in files, folders, and filenames so Templi can prompt for their values when generating new projects.',
  },
  {
    title: 'CLI & Library Integration',
    description:
      'Quickly scaffold new projects via the CLI or integrate Templi in your C++ applications as a library for automated template usage.',
  },
  {
    title: 'Flexible Project Generation',
    description:
      'Generate projects in custom output paths, exclude files or directories, and optionally run scripts before or after generation.',
  },
];

export const Features = () => {
  return (
    <section className="container px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Streamline Your Project Workflow with Templi
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
