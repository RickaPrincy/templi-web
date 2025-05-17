import { motion } from 'framer-motion';
import {
  CLIReference,
  ConfiguringBoilerplatePage,
  CreatingBoilerplatePage,
  ExampleProjectPage,
  InstallationPage,
  IntroductionPage,
  LibraryReference,
  UsingBoilerplatePage,
} from './pages';
import { DocumentationPagination } from './documentation-pagination';

type DocumentationContentProps = {
  currentPage: string;
};

const PAGE_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export const DocumentationContent = ({
  currentPage,
}: DocumentationContentProps) => {
  return (
    <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 overflow-y-auto">
      <motion.div
        exit="exit"
        key={currentPage}
        initial="hidden"
        animate="visible"
        className="prose prose-blue max-w-none"
        variants={PAGE_ANIMATION_VARIANTS}
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
