
import { Navigation } from "@/components/Navigation";
import DocumentationContent from "@/components/documentation/DocumentationContent";
import { DocumentationSidebar } from "@/components/documentation/DocumentationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Documentation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("introduction");
  const navigate = useNavigate();

  // Extract page from URL hash or default to introduction
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setCurrentPage(hash);
    } else {
      // Set default page if no hash
      setCurrentPage("introduction");
      navigate("#introduction", { replace: true });
    }
  }, [location.hash, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SidebarProvider defaultOpen={true}>
        <div className="flex-1 flex w-full">
          <DocumentationSidebar currentPage={currentPage} />
          <AnimatePresence mode="wait">
            <DocumentationContent key={currentPage} currentPage={currentPage} />
          </AnimatePresence>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Documentation;
