import chalk from "chalk";

export const logger = {
  success: (message: string) => {
    console.log(chalk.green("✓"), message);
  },
  error: (message: string) => {
    console.error(chalk.red("✗"), message);
  },
  info: (message: string) => {
    console.log(chalk.blue("ℹ"), message);
  },
  warn: (message: string) => {
    console.log(chalk.yellow("⚠"), message);
  },
};
