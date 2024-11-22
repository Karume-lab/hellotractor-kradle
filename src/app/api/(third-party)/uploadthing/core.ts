// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { validateRequest } from "@/lib/lucia";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    text: {
      maxFileSize: "2MB",
      maxFileCount: 3,
    },
  })
    .middleware(async ({ req }) => {
      const session = await validateRequest();

      if (!session) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // Here you could add additional processing like:
        // - Storing file metadata in your database
        // - Processing images
        // - Sending notifications

        return {
          fileUrl: file.url,
          fileKey: file.key,
          fileName: file.name,
          fileSize: file.size,
          userId: metadata.userId,
        };
      } catch (error) {
        console.error("Upload processing error:", error);
        throw new UploadThingError("Failed to process upload");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
