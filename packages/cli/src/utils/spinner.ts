import ora from 'ora';
import chalk from 'chalk';

export interface Spinner {
  start: () => void;
  success: (message?: string) => void;
  fail: (message?: string) => void;
  warn: (message?: string) => void;
  stop: () => void;
}

export function createSpinner(message: string): Spinner {
  const spinner = ora({
    text: message,
    color: 'blue',
  });

  return {
    start: () => {
      spinner.start();
    },
    success: (successMessage?: string) => {
      spinner.succeed(
        successMessage
          ? chalk.green(successMessage)
          : chalk.green(message + ' completed!')
      );
    },
    fail: (failMessage?: string) => {
      spinner.fail(
        failMessage
          ? chalk.red(failMessage)
          : chalk.red(message + ' failed!')
      );
    },
    warn: (warnMessage?: string) => {
      spinner.warn(
        warnMessage
          ? chalk.yellow(warnMessage)
          : chalk.yellow(message + ' warning!')
      );
    },
    stop: () => {
      spinner.stop();
    },
  };
} 