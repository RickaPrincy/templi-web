import { DocumentationPagination } from './DocumentationPagination';
import { motion } from 'framer-motion';
import { CLIReference } from './pages/CLIReference';
import { LibraryReference } from './pages/LibraryReference';

import { ConfiguringBoilerplatePage } from './pages/ConfiguringBoilerplatePage';
import { CreatingBoilerplatePage } from './pages/CreatingBoilerplatePage';
import { ExampleProjectPage } from './pages/ExampleProjectPage';
import { InstallationPage } from './pages/InstallationPage';
import { IntroductionPage } from './pages/IntroductionPage';
import { UsingBoilerplatePage } from './pages/UsingBoilerplatePage';

interface DocumentationContentProps {
  currentPage: string;
}

const pageAnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const DocumentationContent = ({ currentPage }: DocumentationContentProps) => {
  return (
    <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 overflow-y-auto">
      <motion.div
        className="prose prose-blue max-w-none"
        key={currentPage}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageAnimationVariants}
      >
        {currentPage === 'introduction' && <IntroductionPage />}
        {currentPage === 'installation' && <InstallationPage />}
        {currentPage === 'creating-boilerplate' && <CreatingBoilerplatePage />}
        {currentPage === 'configuring-boilerplate' && (
          <ConfiguringBoilerplatePage />
        )}
        {currentPage === 'using-boilerplate' && <UsingBoilerplatePage />}
        {currentPage === 'cli-reference' && <CLIReference />}
        {currentPage === 'library-reference' && <LibraryReference />}
        {currentPage === 'example-project' && <ExampleProjectPage />}

        <DocumentationPagination currentPage={currentPage} />
      </motion.div>
    </main>
  );
};

export default DocumentationContent;
