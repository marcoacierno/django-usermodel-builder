import { walk } from "./walk";

import { Options } from "./types";
import { generateFiles } from "./generator";
import { generateArchive, finalizeTo } from "./archive";
import { templatePath } from "./helpers";

export const buildArchive = async (options: Options) => {
  const files = await walk(templatePath);
  const compiledFiles = await generateFiles(files, options);
  const archive = generateArchive(compiledFiles);
  finalizeTo(archive, options.pipe);
};
