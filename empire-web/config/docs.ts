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
      title: "GitHub",
      href: "https://github.com/empirecodefoundation/ui",
      external: true,
    },
    {
      title: "NPM",
      href: "https://www.npmjs.com/package/@empireui/components",
      external: true,
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
          label: "Updated",
          labelColor: "green",
        },
        {
          title: "Wiki",
          href: "/docs/wiki",
          items: [],
          label: "New",
          labelColor: "blue",
        },
      ],
    },
    {
      title: "AI Components",
      items: [
        {
          title: "Conversation & Text",
          items: [
            {
              title: "AI Chatbox",
              href: "/docs/ai-chatbox",
              items: [],
              label: "Popular",
              labelColor: "orange",
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
    {
      title: "Data Visualization",
      items: [
        {
          title: "Analytics Cards",
          items: [
            {
              title: "Prediction Output Card",
              href: "/docs/prediction-output-card",
              items: [],
              label: "Popular",
              labelColor: "orange",
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
        {
          title: "Interactive Elements",
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
              title: "Predictive Searchbar",
              href: "/docs/predictive-searchbar",
              items: [],
              label: "New",
              labelColor: "blue",
            },
          ],
        },
      ],
    },
    {
      title: "UI Elements",
      items: [
        {
          title: "Backgrounds",
          items: [
            {
              title: "Wavy Background",
              href: "/docs/wavy-background",
              items: [],
            },
          ]
        },
        {
          title: "Form Elements",
          items: [
            {
              title: "Toast Notifications",
              href: "/docs/toast-notification",
              items: [],
            },
            {
              title: "Button",
              href: "/docs/button",
              items: [],
              label: "Core",
              labelColor: "purple",
            },
            {
              title: "Flowing Menu",
              href: "/docs/flowing-menu",
              items: [],
              label: "New",
              labelColor: "blue",
            },
          ]
        }
      ],
    },
  ],
};
