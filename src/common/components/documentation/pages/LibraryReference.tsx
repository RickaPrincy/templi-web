import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Code } from 'lucide-react';
import { CodeBlock } from '../../code-block';

export function LibraryReference() {
  return (
    <section>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Library Reference
      </h1>

      <p className="text-lg text-muted-foreground mb-6">
        Detailed documentation of Templi's core library functionality and API
        reference.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Core Library API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">generate</h3>
              <p className="mb-3">
                Generates a project from a template with specified values and
                exclusions.
              </p>
              <CodeBlock
                language="cpp"
                code={`void generate(
  std::string template_path,
  std::string output_path,
  std::map<std::string, std::string> values,
  std::vector<std::string> ignored_path = {});`}
                caption="Basic template generation"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                generate_with_templi_config
              </h3>
              <p className="mb-3">
                Generates a project using templi.json configuration.
              </p>
              <CodeBlock
                language="cpp"
                code={`void generate_with_templi_config(
  std::string template_path,
  std::string output_path,
  std::function<std::string(Key key)> get_key_value);`}
                caption="Template generation with configuration"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">configure</h3>
              <p className="mb-3">
                Creates or updates templi.json configuration for a template.
              </p>
              <CodeBlock
                language="cpp"
                code={`void configure(std::string template_path);`}
                caption="Template configuration"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">TempliConfig Class</h3>
              <p className="mb-3">
                Manages template configuration and settings.
              </p>
              <CodeBlock
                language="cpp"
                code={`class TempliConfig {
public:
  std::vector<std::string> m_excludes{};
  std::vector<std::string> m_before{};
  std::vector<std::string> m_after{};
  std::vector<Key> m_keys{};

  void read(std::string template_path);
  void save(std::string template_path);

  TempliConfig() = default;
  TempliConfig(std::string template_path);
};`}
                caption="Configuration management class"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
