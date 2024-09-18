import { docsConfig } from "@/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeProvider } from "@/components/providers";
import { DocsSidebarNav } from "@/components/sidebar-nav";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="border-b pt-12">
        <div className="flex-1 items-start bg-white px-6 sm:px-12 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 dark:bg-zinc-950">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8">
              <DocsSidebarNav items={docsConfig.sidebarNav} />
            </ScrollArea>
          </aside>
          <main className="prose prose-zinc min-w-0 max-w-full flex-1 pb-16 pt-8 dark:prose-invert prose-h1:text-2xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-strong:font-medium prose-table:block prose-table:overflow-y-auto lg:max-w-2xl lg:pt-12">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
