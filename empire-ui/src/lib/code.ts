import fs from "fs";
import path from "path";

export const extractCodeFromFilePath = (filePath: string) => {
  try {
    console.log(`Attempting to read file: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return `// Error: Could not load file '${filePath}'`;
  }
};
