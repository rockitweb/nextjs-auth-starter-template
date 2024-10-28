"use server";

import { getAudit } from "../dbActions/auditActions";

export async function enrichAudit(auditId: string) {
  const audit = await getAudit(auditId);

  console.log("audit", audit);
}
