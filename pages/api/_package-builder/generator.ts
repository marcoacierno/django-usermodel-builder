import { promises as fs } from "fs";

import { Options } from "./types";
import Handlebars from "handlebars";

export const generateFiles = async (
  files: string[],
  options: Options
): Promise<{ [filePath: string]: string }> => {
  const outputFiles = {};

  for (const filePath of files) {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const compiledTemplate = Handlebars.compile(fileContent);
    const generatedFile = compiledTemplate({});

    outputFiles[filePath] = generatedFile;
  }

  return outputFiles;
};
