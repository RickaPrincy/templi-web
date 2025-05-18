import { Card } from '@/common/components/ui/card';

export const QuickStart = () => {
  return (
    <section id="quickstart" className="container px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
        Quick Start Guide
      </h2>
      <div className="grid gap-6 md:grid-cols-1">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
          <div className="bg-zinc-950 rounded-lg p-4">
            <pre className="text-white overflow-x-auto">
              <code>{`# Configure your template
templi configure -t <template-path>

# Generate project
templi generate -t <template-path> -o <output-path>`}</code>
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
};
