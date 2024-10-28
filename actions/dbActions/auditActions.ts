//create crud audit action using drizzle
"use server";
import {
  AuditInsert,
  AuditPageInsert,
  AuditUpsert,
  IssueInsert,
} from "@/@types/dbTypes";
import { db } from "@/db/drizzle";
import { auditPages, audits, issues } from "@/db/schema";
import { get } from "http";
import { getFirst } from "./helpers";
import { eq } from "drizzle-orm";

//get audits for a website
export async function getAudits(websiteId: string) {
  const val = await db
    .select()
    .from(audits)
    .where(eq(audits.websiteId, websiteId));

  return val;
}

//get audit by id
export async function getAudit(auditId: string) {
  console.log("auditId", auditId);
  const val = await db
    .select()
    .from(audits)
    .innerJoin(auditPages, eq(auditPages.auditId, audits.id))
    .where(eq(audits.id, auditId));

  return val;
}

export async function insertAudit(auditData: AuditInsert) {
  const val = await db.insert(audits).values(auditData).returning();

  return getFirst(val);
}

export async function insertAuditPage(auditPageData: AuditPageInsert) {
  const val = await db.insert(auditPages).values(auditPageData).returning();

  return getFirst(val);
}

export async function insertIssues(issuesData: IssueInsert[]) {
  const val = await db.insert(issues).values(issuesData).returning();
}
