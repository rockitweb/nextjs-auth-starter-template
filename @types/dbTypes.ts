import { websitePages, websites } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type website = InferSelectModel<typeof websites>;
export type WebsiteInsert = Omit<website, "id">;
export type WebsiteEdit = Omit<website, "id"> & {
  websitePages?: WebsitePage[];
};

export type WebsitePage = InferSelectModel<typeof websitePages>;

export type WebsitePageUpsert = Omit<WebsitePage, "id"> & { id?: string };
