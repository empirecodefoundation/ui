import { MainNavItem, SidebarNavItem } from "@/types/nav";
import { Item } from "@radix-ui/react-dropdown-menu";
import { title } from "process";

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
              title: "Text Paraphraser Button",
              href: "/docs/ai-paraphraser-button",
              items: [],
            },
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
              title: "Caption Generator Button",
              href: "/docs/ai-caption-generator-button",
              items: [],
            },
            {
              title: "Chatbox",
              href: "/docs/ai-chatbox",
              items: [],
            },
          ],
        },
        {
          title: "Starter components",
          items: [
            {
              title: "Expand Card",
              href: "/docs/expand-card",
              items: [],
            },
            {
              title: "Passcode Card",
              href: "/docs/passcode-card",
              items: [],
            },
            {
              title: "Prediction Output Card",
              href: "/docs/prediction-output-card",
              items: [],
            },
            {
              title: "Training Summary Card",
              href: "/docs/training-summary-card",
              items: [],
            },
            {
              title: "Dataset Overview Card",
              href: "/docs/dataset-overview-card",
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
