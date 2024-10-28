export type IssueType = "error" | "warning" | "notice";
export type MetaInfo = {
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  accessScore: number;
};
export type Issue = {
  context: string;
  code: string;
  message: string;
  type: IssueType;
  typeCode: number;
  runner: "htmlcs" | "axe" | "kayle";
  runnerExtras: Record<string, unknown>;
  recurrence: number;
  selector: string;
  clip?: Pick<DOMRect, "x" | "y" | "height" | "width">;
  clipBase64?: string;
};
export type InnateIssue = {
  context: string;
  selectors: string[];
  code: string;
  issue_type: IssueType;
  type_code: number;
  message: string;
  runner: "accessibility-rs";
  runner_extras: {
    help_url: string;
    description: string;
    impact: string;
  };
  recurrence: number;
  clip?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};
export type Automatable = {
  missingAltIndexs: number[];
};
export type Audit = {
  automateable: Automatable;
  documentTitle: string;
  issues: Issue[];
  meta: MetaInfo;
  pageUrl: string;
};
