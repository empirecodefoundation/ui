import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs",
    },
    {
      title: "Templates",
      href: "/templates",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "AI components",
          items: [
            {
              title: "Text Summarizer Button",
              href: "/docs/ai-summarizer-button",
              items: [],
            },
            {
              title: "Grammar Check Button",
              href: "/docs/ai-grammar-button",
              items: [],
            },
            {
              title: "Translator Button",
              href: "/docs/ai-translator-button",
              items: [],
            },
            {
              title: "Caption Generator Button",
              href: "/docs/ai-caption-generator-button",
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
