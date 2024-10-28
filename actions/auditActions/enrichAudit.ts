"use server";

import { AuditSelect } from "@/@types/dbTypes";
import { getAudit, getAuditIssues } from "../dbActions/auditActions";

export async function enrichAudit(auditId: string) {
  const audit = await getAuditIssues(auditId);


  //audit.map((a) => a);


  console.log("audit", audit);
}
