import path from "path";
import fs from "fs-extra";
import { Config } from "../types";
import { logger } from "./logger";

interface AddComponentOptions {
  component: string;
  config: Config;
  overwrite?: boolean;
}

export async function addComponent({
  component,
  config,
  overwrite = false,
}: AddComponentOptions) {
  try {
    // Get the components package root
    const componentsPkgPath = require.resolve(
      "@empireui/components/package.json"
    );
    const pkgRoot = path.dirname(componentsPkgPath);

    // Source paths from the published package
    const componentSourceDir = path.join(
      pkgRoot,
      "src",
      "components",
      "ui",
      component
    );

    if (!(await fs.exists(componentSourceDir))) {
      throw new Error(`Component not found: ${component}`);
    }

    // Check if src folder exists
    const hasSrcFolder = await fs.exists(path.join(process.cwd(), "src"));

    // Determine base destination path based on project structure
    const componentsBasePath = hasSrcFolder
      ? path.join(process.cwd(), "src", "components")
      : path.join(process.cwd(), "components");

    // Destination paths for component
    const componentDestDir = path.join(componentsBasePath, "ui", component);

    // Check if component already exists
    if ((await fs.exists(componentDestDir)) && !overwrite) {
      throw new Error(`Component already exists: ${component}`);
    }

    // Create destination directory if it doesn't exist
    await fs.ensureDir(componentDestDir);

    // Copy the entire component directory with all files
    await fs.copy(componentSourceDir, componentDestDir, {
      overwrite,
      filter: (src) => {
        // Don't copy apiHandler.ts as it will be handled separately
        return !src.endsWith("apiHandler.ts");
      },
    });

    logger.success(
      `Added component: ${component} to ${path.relative(
        process.cwd(),
        componentDestDir
      )}`
    );

    // Check for API handler
    const apiHandlerSourcePath = path.join(componentSourceDir, "apiHandler.ts");
    if (await fs.exists(apiHandlerSourcePath)) {
      // Determine API path based on project structure
      const apiBasePath = hasSrcFolder
        ? path.join(process.cwd(), "src", "app")
        : path.join(process.cwd(), "app");

      const apiDir = path.join(apiBasePath, "api", component);
      const apiRoutePath = path.join(apiDir, "route.ts");

      // Create API directory
      await fs.ensureDir(apiDir);

      // Copy API handler to route.ts
      await fs.copy(apiHandlerSourcePath, apiRoutePath);
      logger.success(
        `Added API handler for: ${component} to ${path.relative(
          process.cwd(),
          apiRoutePath
        )}`
      );
    }

    // Handle styles
    const styleSourcePath = path.join(componentSourceDir, "styles.css");
    if (await fs.exists(styleSourcePath)) {
      // Styles are already copied with the directory copy above

      // Also append to globals.css
      const globalCssPath = path.join(process.cwd(), config.tailwind.css);
      const componentStyles = await fs.readFile(styleSourcePath, "utf8");

      if (await fs.exists(globalCssPath)) {
        // Add component styles to globals.css with a comment
        const styleToAppend = `\n\n/* ${component.toUpperCase()} COMPONENT STYLES */\n${componentStyles}`;
        await fs.appendFile(globalCssPath, styleToAppend);
        logger.success(
          `Added styles for ${component} to ${config.tailwind.css}`
        );
      } else {
        // Create globals.css if it doesn't exist
        logger.warn(
          `Could not find ${config.tailwind.css}, creating it with component styles`
        );
        const baseTailwindCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ${component.toUpperCase()} COMPONENT STYLES */
${componentStyles}`;

        await fs.ensureDir(path.dirname(globalCssPath));
        await fs.writeFile(globalCssPath, baseTailwindCss);
        logger.success(
          `Created ${config.tailwind.css} with ${component} styles`
        );
      }
    }

    // Copy utils
    const utilsSourcePath = path.join(pkgRoot, "src", "lib", "utils.ts");
    if (await fs.exists(utilsSourcePath)) {
      // Determine utils path based on project structure
      const utilsBasePath = hasSrcFolder
        ? path.join(process.cwd(), "src", config.aliases.utils)
        : path.join(process.cwd(), config.aliases.utils);

      await fs.ensureDir(utilsBasePath);
      const utilsDestPath = path.join(utilsBasePath, "utils.ts");

      // Only copy if it doesn't exist or if overwrite is true
      if (!(await fs.exists(utilsDestPath)) || overwrite) {
        await fs.copy(utilsSourcePath, utilsDestPath);
        logger.success(
          `Added utility functions to ${path.relative(
            process.cwd(),
            utilsDestPath
          )}`
        );
      } else {
        logger.info(
          `Utility functions already exist at ${path.relative(
            process.cwd(),
            utilsDestPath
          )}`
        );
      }
    }
  } catch (error: any) {
    logger.error(`Error adding component: ${error.message || error}`);
    if (error.code === "MODULE_NOT_FOUND") {
      logger.error(
        "Could not find @empireui/components package. Make sure it's installed."
      );
    }
    throw error;
  }
}
