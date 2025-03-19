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
    const componentSourcePath = path.join(componentSourceDir, "index.tsx");

    if (!(await fs.exists(componentSourcePath))) {
      throw new Error(`Component not found: ${component}`);
    }

    // Destination paths
    const destinationDir = path.join(
      process.cwd(),
      config.aliases.components,
      "ui"
    );
    const destinationPath = path.join(destinationDir, `${component}.tsx`);

    // Check if component already exists
    if ((await fs.exists(destinationPath)) && !overwrite) {
      throw new Error(`Component already exists: ${component}`);
    }

    // Create destination directory if it doesn't exist
    await fs.ensureDir(destinationDir);

    // Copy component
    await fs.copy(componentSourcePath, destinationPath);
    logger.success(`Added component: ${component}`);

    // Copy any associated styles
    const styleSourcePath = path.join(componentSourceDir, "styles.css");
    if (await fs.exists(styleSourcePath)) {
      const styleDestination = path.join(
        process.cwd(),
        config.tailwind.css.replace(
          "globals.css",
          `components/${component}.css`
        )
      );
      await fs.ensureDir(path.dirname(styleDestination));
      await fs.copy(styleSourcePath, styleDestination);
      logger.success(`Added styles for: ${component}`);
    }

    // Copy utils
    const utilsSourcePath = path.join(pkgRoot, "src", "lib", "utils.ts");
    if (await fs.exists(utilsSourcePath)) {
      const utilsDestination = path.join(process.cwd(), config.aliases.utils);
      await fs.ensureDir(utilsDestination);
      await fs.copy(utilsSourcePath, path.join(utilsDestination, "utils.ts"));
      logger.success(`Added utility functions`);
    }
  } catch (error) {
    logger.error(`Error adding component: ${error}`);
    if (error === "MODULE_NOT_FOUND") {
      logger.error(
        "Could not find @empireui/components package. Make sure it's installed."
      );
    }
    throw error;
  }
}
