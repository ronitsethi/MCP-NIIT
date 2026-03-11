import { z } from "zod";

export const ReopenSurveyWindowSchema = z.object({
  courseId: z.string().optional().describe("Course identifier (optional if offeringId is provided)"),
  offeringId: z.string().optional().describe("Offering identifier (optional if courseId is provided)"),
  requestedOpenFrom: z.string().optional().describe("ISO date string — when to start the reopened window (defaults to today)"),
  requestedOpenUntil: z.string().describe("ISO date string — when the reopened survey window should close"),
  reason: z.string().min(5).describe("Business reason for reopening the survey window (min 5 characters)"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
});

export const GetSurveyReportSchema = z.object({
  courseId: z.string().optional().describe("Course identifier (optional if offeringId is provided)"),
  offeringId: z.string().optional().describe("Offering identifier"),
  reportType: z.enum(["summary", "detailed", "response_count"]).describe("Type of survey report to generate: summary overview, detailed breakdown, or plain response counts"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
});

export const AmendSurveyClosureSchema = z.object({
  offeringId: z.string().describe("Offering identifier for the survey whose closure date should be amended"),
  currentCloseDate: z.string().optional().describe("Current survey close date in ISO format (for confirmation)"),
  requestedCloseDate: z.string().describe("The new requested close date in ISO format"),
  reason: z.string().min(5).describe("Business reason for the amendment (min 5 characters)"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
});

export const GetExpressInterestReportSchema = z.object({
  courseId: z.string().describe("Course identifier to query demand/interest data for"),
  dateRange: z.object({
    startDate: z.string().describe("Start of date range in ISO format"),
    endDate: z.string().describe("End of date range in ISO format"),
  }).optional().describe("Optional date range filter"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
});

export type ReopenSurveyWindowInput = z.infer<typeof ReopenSurveyWindowSchema>;
export type GetSurveyReportInput = z.infer<typeof GetSurveyReportSchema>;
export type AmendSurveyClosureInput = z.infer<typeof AmendSurveyClosureSchema>;
export type GetExpressInterestReportInput = z.infer<typeof GetExpressInterestReportSchema>;
