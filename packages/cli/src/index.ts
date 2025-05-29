#!/usr/bin/env node

import { Command } from "commander";
import { getConfig, validateConfig } from "./utils/get-config";
import { addComponent } from "./utils/add-component";
import { logger } from "./utils/logger";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import { createSpinner } from "./utils/spinner";
import { checkDependencies } from "./utils/check-dependencies";

// Version check
const requiredNodeVersion = ">=16.0.0";
const currentNodeVersion = process.versions.node;
if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
  logger.error(
    `You are using Node.js ${currentNodeVersion}. Empire UI requires Node.js ${requiredNodeVersion}.`
  );
  process.exit(1);
}

const packageJson = fs.readJSONSync(
  path.join(__dirname, "..", "package.json")
);

const program = new Command();

program
  .name("empire-ui")
  .description("CLI for adding Empire UI components to your project")
  .version(packageJson.version || "1.1.0");

program
  .command("init")
  .description("Initialize Empire UI in your project")
  .option("-y, --yes", "Skip confirmation prompt")
  .action(async (options) => {
    try {
      const spinner = createSpinner("Initializing Empire UI...");
      spinner.start();

      // Check if package.json exists in the current directory
      const hasPkgJson = await fs.pathExists(path.join(process.cwd(), "package.json"));
      if (!hasPkgJson) {
        spinner.fail();
        logger.error("No package.json found. Please run this command in a Next.js project root.");
        return;
      }

      // Check if components.json already exists
      const hasComponentsJson = await fs.pathExists(path.join(process.cwd(), "components.json"));
      if (hasComponentsJson && !options.yes) {
        spinner.warn();
        logger.warn("components.json already exists. Use --yes to overwrite.");
        return;
      }

      // Check for required dependencies
      await checkDependencies(["react", "next", "tailwindcss"]);

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
      
      // Create utils directory and utils.ts if they don't exist
      const hasSrcFolder = await fs.pathExists(path.join(process.cwd(), "src"));
      const utilsBasePath = hasSrcFolder
        ? path.join(process.cwd(), "src", "lib")
        : path.join(process.cwd(), "lib");
      
      await fs.ensureDir(utilsBasePath);
      
      // Check if utils.ts already exists
      const utilsFilePath = path.join(utilsBasePath, "utils.ts");
      if (!await fs.pathExists(utilsFilePath)) {
        // Basic utils.ts contents
        const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
        await fs.writeFile(utilsFilePath, utilsContent);
      }

      spinner.success("Empire UI initialized successfully!");
      
      logger.info("\nNext steps:");
      logger.info("1. Add components with: npx @empireui/empire-ui add <component>");
      logger.info("2. Available components: Button, Card, AIChatbox, etc.");
      logger.info("3. Visit https://empireui.com/docs for documentation");
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
  .option("-a, --all", "Add all AI components")
  .action(async (component, options) => {
    try {
      const spinner = createSpinner(`Adding ${options.all ? "all components" : component}...`);
      spinner.start();

      // 1. Validate project has required dependencies
      const config = await getConfig();
      await validateConfig(config);

      if (options.all && component.toLowerCase() === "ai") {
        // Add all AI components
        const aiComponents = [
          "AIChatbox", 
          "AIGrammarCheckButton", 
          "AIImageCaptionButton", 
          "AIParaphraserButton", 
          "AISummarizerButton", 
          "AITranslatorButton"
        ];
        
        for (const comp of aiComponents) {
          await addComponent({
            component: comp,
            config,
            overwrite: options.overwrite,
          });
        }
        
        spinner.success(`Added all AI components`);
      } else {
        // 2. Add the component
        await addComponent({
          component,
          config,
          overwrite: options.overwrite,
        });
        
        spinner.success(`Added component: ${component}`);
      }
    } catch (error) {
      logger.error(
        error instanceof Error ? error.message : "An error occurred"
      );
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List all available components")
  .action(async () => {
    try {
      // Get the components from the package
      const componentsPkgPath = require.resolve(
        "@empireui/components/package.json"
      );
      const pkgRoot = path.dirname(componentsPkgPath);
      const componentsSourceDir = path.join(pkgRoot, "src", "components", "ui");
      
      const componentDirs = await fs.readdir(componentsSourceDir);
      
      logger.info("Available components:");
      
      // Group components by category
      const aiComponents = componentDirs.filter(dir => dir.startsWith("AI"));
      const standardComponents = componentDirs.filter(dir => !dir.startsWith("AI") && !dir.includes("Background"));
      const backgroundComponents = componentDirs.filter(dir => dir.includes("Background"));
      
      if (standardComponents.length > 0) {
        logger.info("\nStandard UI Components:");
        standardComponents.forEach(comp => logger.info(`- ${comp}`));
      }
      
      if (aiComponents.length > 0) {
        logger.info("\nAI Components:");
        aiComponents.forEach(comp => logger.info(`- ${comp}`));
      }
      
      if (backgroundComponents.length > 0) {
        logger.info("\nBackground Components:");
        backgroundComponents.forEach(comp => logger.info(`- ${comp}`));
      }
      
      logger.info("\nUsage: npx @empireui/empire-ui add <component>");
    } catch (error) {
      logger.error(
        error instanceof Error ? error.message : "An error occurred"
      );
      process.exit(1);
    }
  });

program.parse();
