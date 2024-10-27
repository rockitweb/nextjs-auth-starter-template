"use server";
import { eq } from "drizzle-orm";

//create crud for websitePages

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { websitePages, websites } from "@/db/schema";
import {
  WebsiteEdit,
  WebsiteInsert,
  WebsitePageUpsert,
} from "@/@types/dbTypes";

export const getWebsitesPages = async (websiteId: string) => {
  const data = await db
    .select()
    .from(websitePages)
    .where(eq(websitePages.websiteId, websiteId));
  console.log("getWebsitesPages", data);
  return data;
};

export const deleteWebsite = async (id: string) => {
  await db.delete(websites).where(eq(websites.id, id));

  revalidatePath("/[organisation]/websites");
};

export const upsertWebsitePage = async (data: WebsitePageUpsert) => {
  await db
    .insert(websitePages)
    .values(data)
    .onConflictDoUpdate({ target: websitePages.id, set: data })
    .returning();
  console.log("upsertWebsitePage", data);
  revalidatePath("/[organisation]/websites/[website]");
};
