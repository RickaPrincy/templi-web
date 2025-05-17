import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/common/components/ui/pagination';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DOCUMENTATION_PAGES } from './documentation-sidebar';

type DocumentationPaginationProps = {
  currentPage: string;
};

// Define descriptions for pagination navigation with proper TypeScript types
type PageDescription = {
  prev?: string;
  next?: string;
};

const pageDescriptions: Record<string, PageDescription> = {
  'introduction': {
    next: 'Learn how to install Templi on your system',
  },
  'installation': {
    prev: 'Back to introduction and overview of Templi',
    next: 'Discover how to create your first boilerplate',
  },
  'creating-boilerplate': {
    prev: 'Return to installation instructions',
    next: 'Learn how to configure your boilerplate with templi.json',
  },
  'configuring-boilerplate': {
    prev: 'Back to creating a boilerplate',
    next: 'Find out how to use your boilerplate to generate projects',
  },
  'using-boilerplate': {
    prev: 'Return to boilerplate configuration',
    next: 'See a complete example project with Templi',
  },
  'example-project': {
    prev: 'Back to using your boilerplate',
  },
};

export function DocumentationPagination({
  currentPage,
}: DocumentationPaginationProps) {
  const currentIndex = DOCUMENTATION_PAGES.findIndex(
    (page) => page.id === currentPage
  );
  const prevPage =
    currentIndex > 0 ? DOCUMENTATION_PAGES[currentIndex - 1] : null;
  const nextPage =
    currentIndex < DOCUMENTATION_PAGES.length - 1
      ? DOCUMENTATION_PAGES[currentIndex + 1]
      : null;
  const navigate = useNavigate();

  const currentPageDesc =
    pageDescriptions[currentPage as keyof typeof pageDescriptions] || {};

  const handleNavigate = (hash: string) => {
    navigate(hash);
  };

  return (
    <Pagination className="my-8">
      <PaginationContent className="flex justify-between w-full">
        {prevPage && (
          <PaginationItem>
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleNavigate(`#${prevPage.id}`)}
            >
              <PaginationPrevious className="flex items-center gap-1 border border-border cursor-pointer">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="font-semibold">{prevPage.title}</span>
                {currentPageDesc.prev && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {currentPageDesc.prev}
                  </span>
                )}
              </PaginationPrevious>
            </motion.div>
          </PaginationItem>
        )}

        {nextPage && (
          <PaginationItem className="ml-auto">
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleNavigate(`#${nextPage.id}`)}
            >
              <PaginationNext className="flex items-center gap-1 border border-border bg-[#20252e] text-white cursor-pointer hover:bg-[#2A324A]  hover:text-white">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="font-semibold">{nextPage.title}</span>
                {currentPageDesc.next && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {currentPageDesc.next}
                  </span>
                )}
              </PaginationNext>
            </motion.div>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
