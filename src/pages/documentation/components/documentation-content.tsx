import { motion } from 'framer-motion';
import {
  CLIReference,
  ConfiguringTemplatePage,
  CreatingTemplatePage,
  InstallationPage,
  IntroductionPage,
  LibraryReference,
  UsingTemplatePage,
} from './pages';
import { DocumentationPagination } from './documentation-pagination';
import { useEffect } from 'react';

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
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 overflow-y-auto">
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
        {currentPage === 'creating-template' && <CreatingTemplatePage />}
        {currentPage === 'configuring-template' && <ConfiguringTemplatePage />}
        {currentPage === 'using-template' && <UsingTemplatePage />}
        {currentPage === 'cli-reference' && <CLIReference />}
        {currentPage === 'library-reference' && <LibraryReference />}

        <DocumentationPagination currentPage={currentPage} />
      </motion.div>
    </main>
  );
};
