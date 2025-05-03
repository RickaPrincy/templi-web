import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/common/components/ui/sidebar';
import { File, FileJson, Terminal, Book, Code } from 'lucide-react';
import { useSidebar } from '@/common/components/ui/sidebar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const documentationPages = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: Book,
  },
  {
    id: 'installation',
    title: 'Installation',
    icon: Terminal,
  },
  {
    id: 'creating-boilerplate',
    title: 'Creating a Boilerplate',
    icon: File,
  },
  {
    id: 'configuring-boilerplate',
    title: 'Configuring a Boilerplate',
    icon: FileJson,
  },
  {
    id: 'using-boilerplate',
    title: 'Using Your Boilerplate',
    icon: Terminal,
  },
  {
    id: 'cli-reference',
    title: 'CLI Reference',
    icon: Terminal,
  },
  {
    id: 'library-reference',
    title: 'Library Reference',
    icon: Code,
  },
  {
    id: 'example-project',
    title: 'Example Project',
    icon: File,
  },
] as const;

type DocumentationSidebarProps = {
  currentPage: string;
};

export function DocumentationSidebar({
  currentPage,
}: DocumentationSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to scroll to the active sidebar item
    const scrollToActiveItem = () => {
      const activeItem = document.querySelector('.sidebar-menu-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    // Delay the scroll after the sidebar has been updated
    setTimeout(scrollToActiveItem, 100);
  }, [currentPage, open]);

  // Function to handle navigation and update URL hash
  const handleNavigation = (pageId: string) => {
    navigate(`#${pageId}`, { replace: true });
  };

  return (
    <Sidebar className="md:block hidden border-r">
      <SidebarHeader className="mt-1 pl-2 mb-5">
        <h4 className="text-foreground font-semibold">Documentation</h4>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {documentationPages.map((page) => {
            const Icon = page.icon;
            return (
              <SidebarMenuItem
                key={page.id}
                className={`sidebar-menu-item ${currentPage === page.id ? 'active' : ''}`}
              >
                <SidebarMenuButton asChild isActive={currentPage === page.id}>
                  <a
                    href={`#${page.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(page.id);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{page.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} RickaPrincy. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
