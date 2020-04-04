import path from "path";
import { promises as fs } from "fs";

export const walk = async (start: string) => {
  let files = [];

  const contents = await fs.readdir(start);

  for (const content of contents) {
    const filePath = path.join(start, content);
    const fileStat = await fs.stat(filePath);

    if (fileStat.isDirectory()) {
      const nestedFiles = await walk(filePath);
      files = files.concat(nestedFiles);
    } else {
      files.push(`${start}/${content}`);
    }
  }

  return files;
};
