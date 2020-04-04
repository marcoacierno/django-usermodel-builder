import { NowRequest, NowResponse } from "@now/node";
import { buildArchive } from "./_package-builder/builder";

export default async (req: NowRequest, res: NowResponse) => {
  res.status(200);
  res.setHeader("Content-Disposition", 'attachment; filename="user-model.zip"');
  res.setHeader("Content-type", "application/zip");

  await buildArchive({
    pipe: res,
  });
};
