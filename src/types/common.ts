/**
 * Shared TypeScript types used across the MCP server.
 */

/** Standard envelope returned by every MCP tool. */
export interface ToolResponse<T = Record<string, unknown>> {
  success: boolean;
  toolName: string;
  message: string;
  timestamp: string;
  data: T;
  mockReferenceId: string;
  nextRecommendedStep?: string;
  relatedResource?: string;
}

/** Structured content block for MCP resources. */
export interface ResourceContent {
  title: string;
  domain: string;
  overview: string;
  whenThisApplies: string;
  keyRules: string[];
  commonMisconceptions?: string[];
  escalationPath?: string;
  requiredInputs?: string[];
  relatedTools?: string[];
  exampleQuestions: string[];
  additionalNotes?: string;
}

/** Date range filter used by several tools. */
export interface DateRange {
  startDate: string;
  endDate: string;
}

/** Participant types used in billing and enrollment contexts. */
export type ParticipantType =
  | "internal"
  | "external"
  | "jvn"
  | "ov"
  | "contractor"
  | "other";

/** Systems that learners may need access to. */
export type SystemName =
  | "moodle"
  | "sharepoint"
  | "ms_teams"
  | "workday"
  | "other";

/** Survey report types. */
export type SurveyReportType = "summary" | "detailed" | "response_count";

/** LOI issue classifications. */
export type LoiIssueType =
  | "save_failure"
  | "draft_not_generated"
  | "request_too_early"
  | "general_support";
