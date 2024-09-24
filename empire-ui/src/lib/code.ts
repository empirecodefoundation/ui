import fs from "fs";

export const extractCodeFromFilePath = (filePath: string) => {
  console.log(filePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return fileContent;
};
