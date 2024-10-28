import { url } from "inspector";
import { z } from "zod";

export const WebsiteFormSchema = z.object({
  id: z.string().optional(),
  organisationId: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  pages: z
    .array(
      z.object({
        id: z.string().optional(),
        websiteID: z.string().optional(),
        path: z
          .string()
          .min(2, { message: "must be at least 2 characters long" }),
        // .startsWith("/", { message: "must start with /" }),
      })
    )
    .optional(),
});

export const auditFormSchema = z.object({
  websiteId: z.string().optional(),
  url: z
    .string()
    .url()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});
