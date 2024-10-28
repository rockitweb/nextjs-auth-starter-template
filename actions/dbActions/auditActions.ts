//create crud audit action using drizzle
"use server";
import {
  AuditInsert,
  AuditIssuesSelect,
  AuditPageInsert,
  AuditSelect,
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

/**
 * Retrieves audit records and includes pages based on the provided audit ID.
 *
 * @param {string} auditId - The unique identifier of the audit to retrieve.
 * @returns {Promise<AuditSelect[]>} A promise that resolves to an array of audit records.
 *
 * @example
 * ```typescript
 * const auditRecords = await getAudit("12345");
 * console.log(auditRecords);
 * ```
 */
export async function getAudit(auditId: string): Promise<AuditSelect[]> {
  console.log("auditId", auditId);
  const val: AuditSelect[] = await db
    .select()
    .from(audits)
    .innerJoin(auditPages, eq(auditPages.auditId, audits.id))
    .where(eq(audits.id, auditId));

  return val;
}

/**
 * Retrieves audit issues based on the provided audit ID.
 *
 * @param auditId - The unique identifier of the audit.
 * @returns A promise that resolves to the audit issues.
 */
export async function getAuditIssues(
  auditId: string
): Promise<AuditIssuesSelect[]> {
  const val = await db
    .select()
    .from(audits)
    .innerJoin(auditPages, eq(auditPages.auditId, audits.id))
    .innerJoin(issues, eq(issues.auditPageId, auditPages.id))
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
