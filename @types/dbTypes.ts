import {
  auditPages,
  audits,
  websitePages,
  websites,
  issues,
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Infer } from "next/dist/compiled/superstruct";

export type website = InferSelectModel<typeof websites>;
export type WebsiteInsert = Omit<website, "id" | "createdAt" | "updatedAt">;
export type WebsiteEdit = Omit<website, "id" | "createdAt" | "updatedAt"> & {
  websitePages?: WebsitePage[];
};

export type WebsitePage = InferSelectModel<typeof websitePages>;
export type WebsitePageInsert = Omit<
  WebsitePage,
  "id" | "createdAt" | "updatedAt"
>;
export type WebsitePageEdit = Omit<
  WebsitePage,
  "id" | "createdAt" | "updatedAt"
>;

export type Audit = InferSelectModel<typeof audits>;
export type AuditInsert = Omit<Audit, "id" | "createdAt" | "updatedAt">;

export type AuditPage = InferSelectModel<typeof auditPages>;
export type AuditPageInsert = Omit<AuditPage, "id" | "createdAt" | "updatedAt">;

export type Issue = InferSelectModel<typeof issues>;
export type IssueInsert = Omit<Issue, "id" | "createdAt" | "updatedAt">;
