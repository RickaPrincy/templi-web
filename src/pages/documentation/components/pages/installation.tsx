import { Card, CardContent } from '@/common/components/ui/card';
import { Terminal, Library, Package, AlertTriangle, Info } from 'lucide-react';
import { CodeBlock } from '@/common/components';
import { Link } from 'react-router-dom';

export const InstallationPage = () => (
  <section>
    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      Installing Templi CLI
    </h1>

    <div className="flex items-start gap-4 p-6 bg-red-100 rounded-lg border-2 border-red-500 mb-8 dark:bg-transparent">
      <AlertTriangle className="h-12 w-12 text-red-600 flex-shrink-0" />
      <div>
        <p className="text-lg font-semibold text-red-700 mb-2">Important:</p>
        <p className="text-red-700">
          Only install the Templi CLI if you want to generate projects without
          using the web interface, or if you plan to create your own templates.
          If you just want to explore, you should{' '}
          <Link to={'/templates'} className="underline">
            visit the templates you want to use
          </Link>{' '}
          directly. The web interface is sufficient for that.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 mb-8 dark:bg-transparent">
      <Info className="h-10 w-10 text-amber-500" />
      <p>
        Templi can be installed using prebuilt binaries, as a system library, or
        as a Git submodule.
      </p>
    </div>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Terminal className="h-6 w-6" />
      Arch Linux
    </h2>
    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">Install via AUR using yay:</p>
        <CodeBlock
          language="bash"
          code={`# Install CLI and library\nyay -Sy templi_cli\n\n# Or install only the library\nyay -Sy libtempli`}
          caption="Arch Linux installation with yay"
        />
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <Package className="h-6 w-6" />
      Other Linux distros
    </h2>
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4">
          For x86_64 Linux, precompiled binaries may be available on the{' '}
          <a
            href="https://github.com/RickaPrincy/Templi/releases"
            className="underline text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Releases page
          </a>
        </p>
        <p className="mt-4">
          For Windows and other systems, building manually is required.
        </p>
      </CardContent>
    </Card>

    <h2 className="mt-10 text-2xl font-semibold mb-6 flex items-center gap-2">
      <Library className="h-6 w-6" />
      Others systems
    </h2>

    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">
          For other Linux distributions and platforms, Templi needs to be built
          manually.
        </p>

        <p className="font-semibold mb-2">Requirements:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <a href="https://github.com/Kitware/CMake" className="underline">
              CMake (3.27+)
            </a>
          </li>
          <li>C++ compiler with C++17 support</li>
          <li>
            <a href="https://github.com/RickaPrincy/rcli" className="underline">
              rcli
            </a>
          </li>
        </ul>

        <p className="mt-6 font-semibold mb-5">
          You should build Templi like a standard CMake project. Here's an
          example of how to do it:
        </p>
        <CodeBlock
          language="bash"
          code={`git clone -b v4.1.1 https://github.com/RickaPrincy/Templi.git
cd Templi
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -S .. -B .
sudo make install
cd ../..
rm -rf Templi`}
        />

        <p className="mt-6 font-semibold text-red-500">
          ⚠️ Troubleshooting Missing Libraries
        </p>
        <p className="mb-2">
          If libraries are not found after building manually, add the following
          to your shell config:
        </p>

        <CodeBlock
          language="bash"
          code={`export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH`}
          caption="Update LD_LIBRARY_PATH"
        />
      </CardContent>
    </Card>

    <h2 className="text-2xl font-semibold mb-6">Using Templi as a Submodule</h2>

    <Card className="mb-8">
      <CardContent className="pt-6">
        <p className="mb-4">To include Templi directly in your project:</p>

        <CodeBlock
          language="bash"
          code={`git submodule add https://github.com/RickaPrincy/Templi external/Templi`}
          caption="Add the submodule"
        />

        <CodeBlock
          language="bash"
          code={`git submodule init\ngit submodule update`}
          caption="Initialize and update submodule"
        />

        <CodeBlock
          language="cmake"
          code={`add_subdirectory(path/to/templi)\ntarget_link_libraries(your-target Templi)`}
          caption="Link in CMake"
        />
      </CardContent>
    </Card>
  </section>
);
