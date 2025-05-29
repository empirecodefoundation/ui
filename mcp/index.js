import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "EmpireUI",
  version: "1.0.0",
});

// Check if Empire UI is initialized
server.tool("empireui_check_initialized", {}, async () => {
  try {
    // This is a simplified check - in a real implementation you might want to check
    // for the existence of components.json or other key files
    const fs = await import("fs/promises");
    const componentJsonExists = await fs
      .access("./components.json")
      .then(() => true)
      .catch(() => false);

    return {
      content: [
        {
          type: "text",
          text: componentJsonExists
            ? "Empire UI is initialized in this project."
            : "Empire UI is not initialized. Please run 'npx @empireui/empire-ui init' first.",
        },
      ],
      isInitialized: componentJsonExists,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error checking initialization: ${error.message}`,
        },
      ],
      isInitialized: false,
    };
  }
});

// Button component tool
server.tool(
  "empireui_button",
  {
    children: z.string(),
    className: z.string().optional(),
    disabled: z.boolean().optional(),
    onClick: z.string().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Button
  ${params.className ? `className="${params.className}"` : ""}
  ${params.disabled ? "disabled" : ""}
  ${params.onClick ? `onClick=${params.onClick}` : ""}
>
  ${params.children}
</Button>`,
      },
    ],
  })
);

// Input component tool
server.tool(
  "empireui_input",
  {
    type: z.string().optional(),
    placeholder: z.string().optional(),
    className: z.string().optional(),
    disabled: z.boolean().optional(),
    required: z.boolean().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Input
  type="${params.type || "text"}"
  ${params.placeholder ? `placeholder="${params.placeholder}"` : ""}
  ${params.className ? `className="${params.className}"` : ""}
  ${params.disabled ? "disabled" : ""}
  ${params.required ? "required" : ""}
/>`,
      },
    ],
  })
);

// Dialog component tool
server.tool(
  "empireui_dialog",
  {
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
    triggerText: z.string(),
    className: z.string().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Dialog>
  <DialogTrigger>${params.triggerText}</DialogTrigger>
  <DialogContent ${params.className ? `className="${params.className}"` : ""}>
    <DialogHeader>
      <DialogTitle>${params.title}</DialogTitle>
      ${
        params.description
          ? `<DialogDescription>${params.description}</DialogDescription>`
          : ""
      }
    </DialogHeader>
    ${params.content}
  </DialogContent>
</Dialog>`,
      },
    ],
  })
);

// Dropdown Menu component tool
server.tool(
  "empireui_dropdown_menu",
  {
    triggerText: z.string(),
    items: z.array(
      z.object({
        label: z.string(),
        onClick: z.string().optional(),
        disabled: z.boolean().optional(),
      })
    ),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<DropdownMenu>
  <DropdownMenuTrigger>${params.triggerText}</DropdownMenuTrigger>
  <DropdownMenuContent>
    ${params.items
      .map(
        (item) =>
          `<DropdownMenuItem ${item.onClick ? `onClick=${item.onClick}` : ""} ${
            item.disabled ? "disabled" : ""
          }>
        ${item.label}
      </DropdownMenuItem>`
      )
      .join("\n    ")}
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
  })
);

// Select component tool
server.tool(
  "empireui_select",
  {
    placeholder: z.string().optional(),
    options: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    defaultValue: z.string().optional(),
    disabled: z.boolean().optional(),
    className: z.string().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Select ${
          params.defaultValue ? `defaultValue="${params.defaultValue}"` : ""
        } ${params.disabled ? "disabled" : ""}>
  <SelectTrigger ${params.className ? `className="${params.className}"` : ""}>
    <SelectValue ${
      params.placeholder ? `placeholder="${params.placeholder}"` : ""
    } />
  </SelectTrigger>
  <SelectContent>
    ${params.options
      .map(
        (option) =>
          `<SelectItem value="${option.value}">${option.label}</SelectItem>`
      )
      .join("\n    ")}
  </SelectContent>
</Select>`,
      },
    ],
  })
);

// Textarea component tool
server.tool(
  "empireui_textarea",
  {
    placeholder: z.string().optional(),
    className: z.string().optional(),
    disabled: z.boolean().optional(),
    required: z.boolean().optional(),
    rows: z.number().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Textarea
  ${params.placeholder ? `placeholder="${params.placeholder}"` : ""}
  ${params.className ? `className="${params.className}"` : ""}
  ${params.disabled ? "disabled" : ""}
  ${params.required ? "required" : ""}
  ${params.rows ? `rows={${params.rows}}` : ""}
/>`,
      },
    ],
  })
);

// Toast component tool
server.tool(
  "empireui_toast",
  {
    title: z.string(),
    description: z.string().optional(),
  },
  async (params) => ({
    content: [
      {
        type: "text",
        text: `<Toast>
  <ToastTitle>${params.title}</ToastTitle>
  ${
    params.description
      ? `<ToastDescription>${params.description}</ToastDescription>`
      : ""
  }
</Toast>`,
      },
    ],
  })
);

// Resource for EmpireUI installation instructions
server.resource(
  "empireui-installation",
  "empireui://installation",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: `# EmpireUI Installation
1. Install the package: \`npx @empireui/empire-ui init\`
2. This will set up:
   - components.json configuration
   - Required directories (components/ui, lib)
   - Tailwind CSS configuration
   - Necessary CSS variables and styles
3. Add components with: \`npx @empireui/empire-ui add <component>\`
4. Available components: button, dialog, dropdown-menu, input, label, select, textarea, toast`,
      },
    ],
  })
);

// Resource for EmpireUI component usage examples
server.resource("empireui-examples", "empireui://examples", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `# EmpireUI Component Examples

## Button
\`\`\`jsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button>Click me</Button>
  )
}
\`\`\`

## Input
\`\`\`jsx
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
\`\`\`

## Dialog
\`\`\`jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog description goes here.
          </DialogDescription>
        </DialogHeader>
        <div>Dialog content</div>
      </DialogContent>
    </Dialog>
  )
}
\`\`\`

## Important: Before using these components
Make sure to initialize Empire UI with: \`npx @empireui/empire-ui init\`
Then add each component you need with: \`npx @empireui/empire-ui add <component>\``,
    },
  ],
}));

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
