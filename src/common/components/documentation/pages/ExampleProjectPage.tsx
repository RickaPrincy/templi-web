import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { FileJson, Terminal, Folder, File, Code, Wrench } from 'lucide-react';
import { CodeBlock } from '../../code-block';

export const ExampleProjectPage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Example Project
    </h1>

    <p className="text-lg text-muted-foreground mb-6">
      Let's walk through creating and using a complete Express.js boilerplate
      template.
    </p>

    <div className="space-y-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            Step 1: Create Template Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              <span>templi-express-js/</span>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>package.json</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>README.md</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span>src/</span>
              </div>
              <div className="ml-6">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span>hello-api.js</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span>images/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span>1.png</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span>2.png</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span>3.png</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Step 2: Create Template Files with Placeholders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">package.json:</p>
          <CodeBlock
            language="json"
            code={`{
    "name": "{{project_name}}",
    "version": "{{version}}",
    "description": "{{description}}",
    "author": "{{author_name}}",
    "license": "{{license}}",
    "private": {{is_private}},
    "main": "src/hello-api.js",
    "scripts": {
      "start": "node src/hello-api.js",
      "dev": "nodemon src/hello-api.js"
    },
    "dependencies": {
      "express": "^4.18.2"
    },
    "devDependencies": {
      "nodemon": "^2.0.22"
    }
  }`}
            caption="Template package.json"
          />

          <p className="mb-2 mt-6">src/hello-api.js:</p>
          <CodeBlock
            language="javascript"
            code={`const express = require('express');
  const app = express();
  const port = 3000;
  
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to {{project_name}}',
      author: '{{author_name}}',
      description: '{{description}}'
    });
  });
  
  app.listen(port, () => {
    console.log(\`{{project_name}} listening at http://localhost:\${port}\`);
  });`}
            caption="Template API file"
          />

          <p className="mb-2 mt-6">README.md:</p>
          <CodeBlock
            language="markdown"
            code={`# {{project_name}}
  
  {{description}}
  
  ## Installation
  
  \`\`\`bash
  npm install
  \`\`\`
  
  ## Usage
  
  \`\`\`bash
  npm start
  \`\`\`
  
  ## Author
  
  {{author_name}}
  
  ## License
  
  {{license}}
  `}
            caption="Template README file"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Step 3: Configure the Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Run the configure command:</p>
          <CodeBlock
            language="bash"
            code="templi configure -t ~/Ricka/Projects/templi-express-js"
            caption="Configure command example"
          />

          <img
            src="/lovable-uploads/9a662493-d3d1-4c5a-89f6-196d9dc434b1.png"
            alt="Templi configure output"
            className="mt-4 rounded-md border border-gray-300 shadow-sm"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Step 4: Generate a Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Generate a new project from the template:</p>
          <CodeBlock
            language="bash"
            code="templi generate -t ~/Ricka/Projects/templi-express-js -o test"
            caption="Generate project command"
          />

          <img
            src="/lovable-uploads/a48d3829-38f7-485a-8440-d80cf1c1929c.png"
            alt="Templi interactive prompts during generation"
            className="mt-4 rounded-md border border-gray-300 shadow-sm"
          />

          <p className="mt-4">
            After filling out the prompts, Templi generates the project:
          </p>

          <img
            src="/lovable-uploads/951dc1e2-40af-46d5-865c-3ce46b219c04.png"
            alt="Templi generation results"
            className="mt-4 rounded-md border border-gray-300 shadow-sm"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Final Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Here's what happens after the project is generated:
          </p>
          <CodeBlock
            language="bash"
            code={`cd test; npm install; rm -rf .git; git init . ; git add --all; git commit -m "chore: init project with templi"
  
  added 69 packages, and audited 70 packages in 9s
  
  15 packages are looking for funding
    run \`npm fund\` for details
  
  found 0 vulnerabilities
  Dépôt Git vide initialisé dans /home/ricka/Ricka/Projects/test/.git/
  [main (commit racine) 9db8b85] chore: init project with templi
   9 files changed, 931 insertions(+)
   create mode 100644 .env.template
   create mode 100644 .gitignore
   create mode 100644 README.md
   create mode 100644 images/1.png
   create mode 100644 images/2.png
   create mode 100644 images/3.png
   create mode 100644 package-lock.json
   create mode 100644 package.json
   create mode 100644 src/hello-api.js
  
  [ DONE ]: Project generated successfully`}
            caption="Post-generation output"
          />
          <p className="mt-4 bg-green-50 p-3 rounded-md border border-green-200">
            You now have a fully functional Express.js application, initialized
            as a Git repository and ready for development!
          </p>
        </CardContent>
      </Card>
    </div>

    <h2 className="text-2xl font-semibold mb-6">More Template Examples</h2>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Templi Templates Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          The templi-templates repository contains various ready-to-use
          templates:
        </p>

        <CodeBlock
          language="bash"
          code={`# Basic usage
  templi generate -t https://github.com/RickaPrincy/templi-templates.git -p <template_to_use> -o <your_out_folder>`}
          caption="Using templates from GitHub"
        />

        <h3 className="mt-8 mb-4 text-xl font-semibold">Example Commands</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Poja CLI</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`templi generate -t https://github.com/RickaPrincy/templi-templates.git -p "/poja-cli" -o ~/poja-std22052`}
              />
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">C++ Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`templi generate -t https://github.com/RickaPrincy/templi-templates.git -p "/libc++" -o ~/libc++`}
              />
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">FJPA</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`templi generate -t https://github.com/RickaPrincy/templi-templates.git -p "/fjpa" -o ~/myproject`}
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/RickaPrincy/templi-templates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Folder className="h-4 w-4" />
            Browse more examples on GitHub
          </a>
        </div>
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6">
      Template Examples: C++ Implementation
    </h2>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle>C++ Implementation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Templi is written in C++. Here's an example of its core
          implementation:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">Main CLI Entry Point</h3>
            <CodeBlock
              language="cpp"
              code={`#include <TColor/TColor.hpp>
  #include <Templi/Templi.hpp>
  #include <Templi/TempliConfig.hpp>
  #include <Templi/types.hpp>
  #include <filesystem>
  #include <rcli/command.hpp>
  #include <rcli/input_config.hpp>
  #include <rcli/inputs.hpp>
  #include <rcli/rcli.hpp>
  
  #include "../lib/fs_utils.hpp"
  #include "utils.hpp"
  
  using namespace Templi;
  const std::string GIT_SUFFIX = ".git";
  
  int main(int argc, const char *argv[])
  {
      // base of the application
      rcli::App templi("templi", "Generate a project easily", Templi_VERSION);
      templi.add_informations(
          { { "Author", "RickaPrincy" }, { "Github", "<https://github.com/RickaPrincy/Templi>" } });
  
      rcli::InputConfig config;
      config.required(true).clean(true);
  
      // configure command
      rcli::Option template_path_option("-t,--template", "Specify template path", "template_path");
      rcli::Command configure("configure",
          "Configure one template to generate templi.json",
          [&](rcli::Command *_configure)
          {
              std::string template_path = _configure->get_option_value("template_path");
              if (template_path.empty())
                  template_path = rcli::ask_input_value(config.text("Template path"));
              try
              {
                  Templi::configure(template_path);
                  TColor::write_endl(TColor::B_GREEN, "[ DONE ]: \\"templi.json\\" was generated");
              }
              catch (Templi::Exception error)
              {
                  std::string message = error.what();
                  TColor::write_endl(TColor::B_RED, "[ ERROR ]: " + message);
              }
          });
  
      configure.add_option(&template_path_option);
  
      // generate command
      rcli::Command generate("generate",
          "Generate new project with one template",
          [&](rcli::Command *_generate)
          {
              std::string template_path = _generate->get_option_value("template_path");
              std::string output_path = _generate->get_option_value("output_path");
              std::string path_suffix = _generate->get_option_value("path_suffix");
  
              if (template_path.empty())
                  template_path = rcli::ask_input_value(config.text("Template path (or github url)"));
  
              if (output_path.empty())
                  output_path = rcli::ask_input_value(config.text("Output path"));
  
              auto is_github_repository = false;
              try
              {
                  if (template_path.length() >= GIT_SUFFIX.length())
                  {
                      // test if the template_path is a git repository
                      if (0 == template_path.compare(template_path.length() - GIT_SUFFIX.length(),
                                   GIT_SUFFIX.length(),
                                   GIT_SUFFIX))
                      {
                          Templi::clone_template(template_path);
                          std::cout << "\\n";
                          is_github_repository = true;
                      }
                  }
                  std::string valid_template_path = template_path;
                  if (!path_suffix.empty())
                  {
                      valid_template_path =
                          (std::filesystem::path(template_path) / std::filesystem::path(path_suffix))
                              .string();
                  }
  
                  Templi::generate_with_templi_config(valid_template_path,
                      output_path,
                      [&](Key key) { return Templi::ask_input_value(key); });
                  if (is_github_repository)
                  {
                      Templi::delete_folder(template_path);
                  }
  
                  TColor::write_endl(TColor::B_GREEN, "\\n[ DONE ]: Project generated successfully");
              }
              catch (Templi::Exception error)
              {
                  std::string message = error.what();
                  TColor::write_endl(TColor::B_RED, "[ ERROR ]: " + message);
                  if (is_github_repository && std::filesystem::exists(template_path))
                  {
                      Templi::delete_folder(template_path);
                  }
              }
          });
  
      generate.add_option(&template_path_option);
      generate.add_option("-o,--output", "Specify output path", "output_path");
      generate.add_option(
          "-p, --path-suffix", "Path suffix after template_path if you use monorepo", "path_suffix");
  
      templi.add_subcommand(&configure);
      templi.add_subcommand(&generate);
  
      templi.run(argc, argv);
      return 0;
  }`}
            />
          </div>

          <div>
            <h3 className="mb-2 font-medium">Core Library Implementation</h3>
            <CodeBlock
              language="cpp"
              code={`#include <TColor/TColor.hpp>
  #include <Templi/Templi.hpp>
  #include <Templi/TempliConfig.hpp>
  #include <Templi/types.hpp>
  #include <algorithm>
  #include <utility>
  
  #include "fs_utils.hpp"
  #include "parser.hpp"
  #include "utils.hpp"
  
  using namespace Templi;
  
  static const std::string GIT_SUFFIX = ".git";
  
  void Templi::generate(std::string template_path,
      std::string output_path,
      std::map<std::string, std::string> values,
      std::vector<std::string> ignored_path)
  {
      Templi::copy_folder(template_path, output_path);
  
      std::vector<std::string> files = Templi::get_files_with_placeholder(output_path, ignored_path);
  
      if (files.empty())
          throw Templi::Exception("Folder empty or no words inside {{}} was found");
  
      for (auto file : files)
      {
          Templi::replace_placeholders_in_file(file, file, values);
      }
      Templi::replace_folder_filename_placeholders(output_path, values, ignored_path);
  }
  
  void Templi::configure(std::string template_path)
  {
      TempliConfig templi_config;
      templi_config.m_excludes.push_back(TEMPLI_CONFIG_NAME);
  
      if (std::filesystem::exists(Templi::create_config_path(template_path)))
      {
      TempliConfig configure_templi_config(template_path);
      templi_config.m_excludes = configure_templi_config.m_excludes;
      }
  
      std::vector<std::string> files =
          Templi::get_files_with_placeholder(template_path, templi_config.m_excludes);
      std::set<std::string> words{};
  
      if (files.empty())
          throw Templi::Exception("Folder empty or no words inside {{}} was found");
  
      for (auto file : files)
      {
          std::set<std::string> words_found_in_file_name =
              Templi::extract_placeholders_from_text(file);
          std::set<std::string> words_found = Templi::extract_placeholders_from_file(file);
  
          for (auto word_found : words_found_in_file_name)
              words_found.insert(word_found);
  
          if (words_found.empty())
              templi_config.m_excludes.push_back(file.substr(template_path.size() + 1));
  
          for (auto word_found : words_found)
              words.insert(word_found);
      }
  
      for (auto word : words)
      {
          Key new_key;
          new_key.m_label = "What is the value of : " + word + " ?";
          new_key.m_name = word;
          new_key.m_type = KeyType::INPUT;
          templi_config.m_keys.push_back(new_key);
      }
      templi_config.save(template_path);
  }
  
  void Templi::generate_with_templi_config(std::string template_path,
      std::string output_path,
      std::function<std::string(Key key)> get_key_value)
  {
      std::map<std::string, std::string> values{ { "TEMPLI_OUTPUT_FOLDER", output_path } };
      TempliConfig templi_config(template_path);
  
      std::for_each(templi_config.m_keys.begin(),
          templi_config.m_keys.end(),
          [&](Key &key) { values.insert(std::make_pair(key.m_name, get_key_value(key))); });
  
      Templi::execute_scripts(values, templi_config.m_before);
      Templi::generate(template_path, output_path, values, templi_config.m_excludes);
      Templi::delete_file(Templi::create_config_path(output_path));
      Templi::execute_scripts(values, templi_config.m_after);
  }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
);
