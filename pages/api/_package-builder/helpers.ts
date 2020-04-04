import process from "process";

import path from "path";

export const templatePath = path.join(
  process.cwd(),
  "pages",
  "api",
  "_package-builder",
  "template"
);
