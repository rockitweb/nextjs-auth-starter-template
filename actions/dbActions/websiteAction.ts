"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { websites } from "@/db/schema";
import { WebsiteEdit, WebsiteInsert } from "@/@types/dbTypes";
import { upsertWebsitePage } from "./websitePageAction";

export const getWebsites = async (organisationId?: string) => {
  organisationId = organisationId === "admin" ? undefined : organisationId;
  const data = await db
    .select()
    .from(websites)
    .where(
      organisationId ? eq(websites.organisationId, organisationId) : undefined
    );
  console.log("getWebsites", data);
  return data;
};

export const getWebsite = async (id: string) => {
  const data = await db.select().from(websites).where(eq(websites.id, id));
  return data;
};

export const addWebsite = async (data: WebsiteInsert) => {
  const res = await db.insert(websites).values(data).returning();
  console.log("addWebsite", res);
  revalidatePath("/[organisation]/websites");
  return res;
};

export const deleteWebsite = async (id: string) => {
  await db.delete(websites).where(eq(websites.id, id));

  revalidatePath("/[organisation]/websites");
};

export const editWebsite = async (id: string, data: WebsiteEdit) => {
  // await db.update(websites).set(data).where(eq(websites.id, id));

  //get the array of pages from the data object and remove it from the data object
  const websitePages = data.websitePages;
  delete data.websitePages;

  const val = await db
    .insert(websites)
    .values(data)
    .onConflictDoUpdate({ target: websites.id, set: data })
    .returning();

  if (websitePages) {
    upsertWebsitePage(id, websitePages);
  }

  console.log("editWebsite", data);
};
