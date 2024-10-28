"use server";
import {
  Audit,
  AuditInsert,
  AuditPageInsert,
  IssueInsert,
  website,
  WebsitePage,
} from "@/@types/dbTypes";
import {
  insertAudit,
  insertAuditPage,
  insertIssues,
} from "../dbActions/auditActions";
import { auditFormSchema } from "./schemas";
import { FormState } from "./websiteFormSubmit";
import { getWebsite } from "../dbActions/websiteAction";
import { AuditPage } from "../kayle/audit";
import { Audit as KayleAudit } from "@/@types/kayleTypes";
import { getWebsitesPages } from "../dbActions/websitePageAction";
import { auditPages } from "@/db/schema";

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = auditFormSchema.safeParse(formData);

  if (!parsed.success) {
    const ret = {
      message: "Invalid form data",

      issues: parsed.error.issues.map((issue) => issue.message),
    };

    console.log("error", ret);
    return ret;
  }

  const { websiteId, url } = parsed.data;

  let websiteResult: website | null = null;
  let websitePages: WebsitePage[] = [];
  if (websiteId && websiteId !== "") {
    const w = getWebsite(websiteId, false);
    const wp = getWebsitesPages(websiteId);
    [websiteResult, websitePages] = await Promise.all([w, wp]);
  }

  if (!websitePages || websitePages.length === 0) {
    return { message: "No pages found for website" };
  }

  const auditUrl = websiteResult?.url || url || "";
  //create a new audit
  const newAuditData: AuditInsert = {
    websiteId: websiteId || null,
    url: auditUrl,
    status: null,
    title: websiteResult?.title || "",
  };

  const newAudit = await insertAudit(newAuditData);

  if (!newAudit) {
    return { message: "Audit Creation Failed" };
  }

  //run the audit for each page
  const pagesToBeAudited = websitePages.map((page) =>
    AuditPage(`${websiteResult?.url}${page.path}`)
  );

  const pageAudits = await Promise.all(pagesToBeAudited);

  //now we loop all page results and insert them into the database
  //pageAudits.forEach(async (kayleAudit,index) => {
  for (let index = 0; index < pageAudits.length; index++) {
    const kayleAudit = pageAudits[index];
    const websitePage = websitePages[index];

    const newAuditPageData: AuditPageInsert = {
      path: websitePage.path,
      status: "",
      auditId: newAudit.id,
      websitePageId: websitePage.id,
      errorCount: kayleAudit.meta.errorCount,
      warningCount: kayleAudit.meta.warningCount,
      noticeCount: kayleAudit.meta.noticeCount,
      accessScore: kayleAudit.meta.accessScore,
    };
    const auditPage = await insertAuditPage(newAuditPageData);
    if (!auditPage) {
      return { message: "Audit Page Creation  Failed" };
    }
    //and now we insert the issues
    const issuesData: IssueInsert[] = kayleAudit.issues.map((issue) => {
      const issueData: IssueInsert = {
        status: "Open",
        code: null,
        type: null,
        auditPageId: auditPage.id,
        context: issue.context,
        typeCode: issue.typeCode.toString(),
        runner: issue.runner,
        recurence: issue.recurrence,
        selector: issue.selector,
        clip: null,
        clipBase64: issue.clipBase64 || null,
        recommendations: null,
        wcagSectionReference: null,
        wcagSectionTitle: null,
        wcagSectionUrl: null,
        wcagSectionDescription: null,
        wcagGuidelineReference: null,
        wcagGuidelineTitle: null,
        wcagGuidelineUrl: null,
        wcagGuidelineDescription: null,
        wcagSuccessCriterionReference: null,
        wcagSuccessCriterionTitle: null,
        wcagSuccessCriterionUrl: null,
        wcagSuccessCriterionDescription: null,
        severity: null,
        wcagLevel: null,
        score: null,
      };
      return issueData;
    });
    await insertIssues(issuesData);

    //todo: enrich the data
  }
  /*   if (!auditPage) {
    return { message: "Audit Page Creation  Failed" };
  } */

  return { message: "Audit Complete" };
}
