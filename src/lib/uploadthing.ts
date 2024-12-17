import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "../../../server/lib/uploadthing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
