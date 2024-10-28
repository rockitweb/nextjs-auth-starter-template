"use server";
import { eq } from "drizzle-orm";

//create crud for websitePages

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { websitePages, websites } from "@/db/schema";
import { WebsitePageInsert } from "@/@types/dbTypes";

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

export const insertWebsitePage = async (data: WebsitePageInsert) => {
  await db.insert(websitePages).values(data).returning();
  revalidatePath("/[organisation]/websites/[website]");
};

export const updateWebsitePage = async (
  id: string,
  data: WebsitePageInsert
) => {
  await db
    .update(websitePages)
    .set(data)
    .where(eq(websitePages.id, id))
    .returning();
  revalidatePath("/[organisation]/websites/[website]");
};


//delete website page
export const deleteWebsitePage = async (id: string) => {
  await db.delete(websitePages).where(eq(websitePages.id, id));
  revalidatePath("/[organisation]/websites/[website]");
}