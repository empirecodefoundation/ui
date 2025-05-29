import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

/**
 * Checks if the required dependencies are installed in the project
 * @param dependencies Array of required dependencies
 */
export async function checkDependencies(dependencies: string[]): Promise<boolean> {
  try {
    // Read package.json from the current directory
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      logger.error('No package.json found. Are you in the root of your project?');
      return false;
    }
    
    const packageJson = await fs.readJSON(packageJsonPath);
    const { dependencies: deps = {}, devDependencies: devDeps = {} } = packageJson;
    
    // Combine dependencies and devDependencies
    const allDeps = { ...deps, ...devDeps };
    
    // Check if each required dependency is installed
    const missingDeps: string[] = [];
    
    for (const dep of dependencies) {
      if (!allDeps[dep]) {
        missingDeps.push(dep);
      }
    }
    
    if (missingDeps.length > 0) {
      logger.warn(`Missing dependencies: ${missingDeps.join(', ')}`);
      logger.info('Please install these dependencies before continuing:');
      
      // Suggest npm command to install
      const installCmd = `npm install ${missingDeps.join(' ')}`;
      logger.info(`  ${installCmd}`);
      
      return false;
    }
    
    return true;
  } catch (error) {
    logger.error('Error checking dependencies');
    logger.error(error instanceof Error ? error.message : String(error));
    return false;
  }
} 