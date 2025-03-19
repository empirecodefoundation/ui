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
  // 1. Get component source path from packages directory
  const componentSourceDir = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "components",
    "src",
    "components",
    "ui",
    component
  );
  const componentSourcePath = path.join(componentSourceDir, "index.tsx");

  if (!(await fs.exists(componentSourcePath))) {
    throw new Error(`Component not found in packages: ${component}`);
  }

  // 2. Get destination path
  const destinationDir = path.join(
    process.cwd(),
    config.aliases.components,
    "ui"
  );
  const destinationPath = path.join(destinationDir, `${component}.tsx`);

  // 3. Check if component already exists
  if ((await fs.exists(destinationPath)) && !overwrite) {
    throw new Error(`Component already exists: ${component}`);
  }

  // 4. Create destination directory if it doesn't exist
  await fs.ensureDir(destinationDir);

  // 5. Copy component
  await fs.copy(componentSourcePath, destinationPath);
  logger.success(`Added component: ${component}`);

  // 6. Copy any associated styles from packages
  const styleSourcePath = path.join(componentSourceDir, "styles.css");
  if (await fs.exists(styleSourcePath)) {
    const styleDestination = path.join(
      process.cwd(),
      config.tailwind.css.replace("globals.css", `components/${component}.css`)
    );
    await fs.ensureDir(path.dirname(styleDestination));
    await fs.copy(styleSourcePath, styleDestination);
    logger.success(`Added styles for: ${component}`);
  }

  // 7. Copy any dependencies from packages
  const dependenciesDir = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "components",
    "src",
    "lib"
  );
  const utilsPath = path.join(dependenciesDir, "utils.ts");
  if (await fs.exists(utilsPath)) {
    const utilsDestination = path.join(process.cwd(), config.aliases.utils);
    await fs.ensureDir(utilsDestination);
    await fs.copy(utilsPath, path.join(utilsDestination, "utils.ts"));
    logger.success(`Added utility functions`);
  }
}
