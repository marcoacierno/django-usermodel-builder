import path from "path";

import archiver from "archiver";

import { templatePath } from "./helpers";
export const generateArchive = (files: { [filePath: string]: string }) => {
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  Object.entries(files).forEach(([filePath, fileContent]) => {
    const relativePath = path.relative(templatePath, filePath);
    // for some reason .directory does not work?
    archive.append(fileContent, { name: `users/${relativePath}` });
  });

  return archive;
};

export const finalizeTo = (archive: any, pipe: WritableStream) => {
  return new Promise((resolve, reject) => {
    archive.pipe(pipe);

    archive.on("close", () => {
      resolve();
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn("Archive::", err);
      } else {
        reject(err);
      }
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.finalize();
  });
};
