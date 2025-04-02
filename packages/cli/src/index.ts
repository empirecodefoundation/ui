#!/usr/bin/env node

import { Command } from "commander";
import { getConfig, validateConfig } from "./utils/get-config";
import { addComponent } from "./utils/add-component";
import { logger } from "./utils/logger";
import fs from "fs-extra";

const program = new Command();

program
  .name("empire-ui")
  .description("CLI for adding Empire UI components to your project")
  .version("1.0.3");

program
  .command("init")
  .description("Initialize Empire UI in your project")
  .action(async () => {
    try {
      const config = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "tailwind.config.js",
          css: "app/globals.css",
          baseColor: "slate",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      };

      await fs.writeJSON("components.json", config, { spaces: 2 });
      logger.success("Created components.json");
    } catch (error) {
      logger.error(
        error instanceof Error ? error.message : "An error occurred"
      );
      process.exit(1);
    }
  });

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "name of the component")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(async (component, options) => {
    try {
      // 1. Validate project has required dependencies
      const config = await getConfig();
      await validateConfig(config);

      // 2. Add the component
      await addComponent({
        component,
        config,
        overwrite: options.overwrite,
      });
    } catch (error) {
      logger.error(
        error instanceof Error ? error.message : "An error occurred"
      );
      process.exit(1);
    }
  });

program.parse();
