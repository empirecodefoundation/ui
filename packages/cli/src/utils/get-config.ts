import path from "path";
import fs from "fs-extra";
import { Config } from "../types";

export async function getConfig(): Promise<Config> {
  const configPath = path.join(process.cwd(), "components.json");

  if (!(await fs.exists(configPath))) {
    throw new Error("No components.json found. Run `empire-ui init` first.");
  }

  const config = (await fs.readJSON(configPath)) as Config;
  return config;
}

export async function validateConfig(config: Config) {
  // Validate the config has required fields
  const requiredFields: (keyof Config)[] = ["style", "tailwind", "aliases"];

  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required field: ${field} in components.json`);
    }
  }

  // Validate paths exist
  const tailwindConfig = path.join(process.cwd(), config.tailwind.config);
  const tailwindCss = path.join(process.cwd(), config.tailwind.css);

  if (!(await fs.exists(tailwindConfig))) {
    throw new Error(`Tailwind config not found: ${config.tailwind.config}`);
  }

  if (!(await fs.exists(tailwindCss))) {
    throw new Error(`Tailwind CSS file not found: ${config.tailwind.css}`);
  }
}
