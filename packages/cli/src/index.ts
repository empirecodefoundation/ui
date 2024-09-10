#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import * as constants from "./utils/constants";

// Function to copy all files in a directory, including subdirectories (like the apiHandler.ts)
function copyComponentFiles(componentName: string, projectPath: string): void {
  // Your component folder is outside of the cli folder, so we go up one directory
  const componentSourcePath = path.join(
    __dirname,
    "../../../components", // Adjusted path to reach the components folder
    componentName
  );

  const componentDestPath = path.join(projectPath, "components", componentName);

  if (!fs.existsSync(componentSourcePath)) {
    console.error(`Component ${componentName} does not exist!`);
    process.exit(1);
  }

  // Create destination directory if it doesn't exist
  fs.mkdirSync(componentDestPath, { recursive: true });

  // Recursively copy all files from the source to the destination folder
  fs.copySync(componentSourcePath, componentDestPath);

  console.log(
    `${componentName} component added to your project in components/${componentName}!`
  );

  // Check for apiHandler.ts file and copy it if it exists
  const apiHandlerSourcePath = path.join(componentSourcePath, "apiHandler.ts");
  const apiHandlerDestPath = path.join(componentDestPath, "apiHandler.ts");

  if (fs.existsSync(apiHandlerSourcePath)) {
    fs.copyFileSync(apiHandlerSourcePath, apiHandlerDestPath);
    console.log(`apiHandler.ts added to ${componentName}!`);
  } else {
    console.log(`No apiHandler.ts found for ${componentName}`);
  }
}

// Function to update the .env file with all AI API keys
function updateEnvFile(projectPath: string): void {
  const envFilePath = path.join(projectPath, ".env");

  let envContent = "";

  // Loop through all keys in the API keys list and add them to the env file
  Object.keys(constants.apiKeysList).forEach((key: string) => {
    const envLine = `${key}=${constants.apiKeysList[key]}\n`;
    envContent += envLine;
  });

  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, envContent);
    console.log(".env file created and updated with AI API keys!");
  } else {
    fs.appendFileSync(envFilePath, envContent);
    console.log(".env file updated with AI API keys!");
  }
}

// Main CLI logic
const args = process.argv.slice(2);
const componentName = args[0];

if (!componentName) {
  console.error("Please specify a component name!");
  process.exit(1);
}

const projectPath = process.cwd(); // Current user's project path

// Copy the component files to the user's project
copyComponentFiles(componentName, projectPath);

// Update the .env file with all AI API keys
updateEnvFile(projectPath);
