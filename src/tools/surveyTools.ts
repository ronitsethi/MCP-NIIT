import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ReopenSurveyWindowSchema, GetSurveyReportSchema, AmendSurveyClosureSchema, GetExpressInterestReportSchema } from "../schemas/surveySchemas.js";
import { reopenSurveyWindow, getSurveyReport, amendSurveyClosure, getExpressInterestReport } from "../services/surveyService.js";
import { logger } from "../utils/logger.js";

export function registerSurveyTools(server: McpServer) {
  server.tool(
    "reopen_survey_window",
    `Reopen or extend a post-delivery survey access window for a specific course offering.

WHAT IT DOES:
Submits a request to reopen the survey window so participants who missed it can still provide feedback. Returns a request acknowledgement with reference ID, status, and effective date range.

WHEN TO USE:
- A Learning Advisor reports that a survey link is no longer accessible.
- The survey window closed before sufficient responses were collected.
- The survey response rate is below the 50% threshold and the advisor wants to collect more responses.
- A stakeholder requests extending the survey period due to holidays, late notifications, or special circumstances.

WHEN NOT TO USE:
- If the question is about survey policy, process, or how surveys work in general — use the survey_management_knowledge resource instead.
- If the advisor only wants to see survey results — use get_survey_report instead.
- If the advisor wants to change the survey close date (not reopen) — use amend_survey_closure instead.

INPUT DETAILS:
- courseId: Course identifier (optional if offeringId is provided).
- offeringId: Specific offering identifier (optional if courseId is provided).
- requestedOpenFrom: When to start the reopened window (defaults to today).
- requestedOpenUntil: REQUIRED — the new close date for the reopened survey window.
- reason: Business justification for reopening (minimum 5 characters).
- requestedBy: Name or email of the requesting Learning Advisor.

OUTPUT:
Request acknowledgement with: request status, effective date range, processing time estimate, and approval requirement.

BUSINESS ASSUMPTIONS:
- Reopening requires approval from the survey administration team.
- Processing takes 1-2 business days.
- Reopening does NOT re-send notification emails — the advisor must manually share the survey link.

EXAMPLE PROMPTS:
- "Survey link is not accessible, can it be reopened until next week?"
- "Can we reopen the survey for offering OFF-2001 until March 20?"
- "Survey response rate is too low — please extend the survey window"
- "Reopen survey access for Leadership Essentials until end of month"`,
    ReopenSurveyWindowSchema.shape,
    async (input) => {
      logger.info("Tool called: reopen_survey_window", input);
      const result = await reopenSurveyWindow(input);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "get_survey_report",
    `Fetch the latest survey participation metrics or report artifacts for a course offering.

WHAT IT DOES:
Retrieves survey data including participation counts, response rate, average rating, and a downloadable report URL. Supports summary, detailed, and response-count report types.

WHEN TO USE:
- A Learning Advisor asks how many participants completed the survey.
- A stakeholder requests the latest survey report or response metrics.
- The advisor needs to check response rates before deciding whether to extend the survey window.

WHEN NOT TO USE:
- If the question is about how surveys work, policies, or the survey lifecycle — use the survey_management_knowledge resource.
- If the advisor wants to reopen or extend the survey — use reopen_survey_window.
- If the question is about express interest (demand capture) — use get_express_interest_report.

INPUT DETAILS:
- courseId: Course identifier (optional if offeringId is provided).
- offeringId: Specific offering identifier.
- reportType: "summary" for overview, "detailed" for full breakdown, "response_count" for just the numbers.
- requestedBy: Name or email of the requesting Learning Advisor.

OUTPUT:
Survey metrics: total participants, responses received, response rate, average rating, close date, and report download URL.

EXAMPLE PROMPTS:
- "How many participants completed the survey?"
- "Can you share the latest survey report for CRS-1001?"
- "What is the current survey response rate?"
- "Get me the detailed survey results for offering OFF-2001"`,
    GetSurveyReportSchema.shape,
    async (input) => {
      logger.info("Tool called: get_survey_report", input);
      const result = await getSurveyReport(input);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "amend_survey_closure",
    `Request a change to the survey closure date for a specific offering.

WHAT IT DOES:
Submits a request to change (shorten or extend) the survey close date. Returns the amendment status and approval workflow information.

WHEN TO USE:
- A Learning Advisor wants to close the survey earlier because sufficient responses were collected.
- A stakeholder requests extending the survey window beyond the standard 14 days.
- The advisor wants to change the close date from the default schedule.

WHEN NOT TO USE:
- If the survey has already closed and needs to be reopened — use reopen_survey_window.
- If the question is about survey closure policies in general — use survey_closure_policy_knowledge resource.
- If the advisor just wants to check survey results — use get_survey_report.

INPUT DETAILS:
- offeringId: REQUIRED — the offering whose survey closure should change.
- currentCloseDate: Current close date for confirmation (optional).
- requestedCloseDate: REQUIRED — the new desired close date.
- reason: Business justification (minimum 5 characters).
- requestedBy: Requesting Learning Advisor.

OUTPUT:
Amendment status, approval workflow description, and updated closure metadata.

EXAMPLE PROMPTS:
- "Please amend the survey closure from 30 days to 15 days"
- "Change the survey close date for OFF-2001 to April 15"
- "Can we close the survey early since we hit 80% response rate?"
- "Extend the survey deadline by one week"`,
    AmendSurveyClosureSchema.shape,
    async (input) => {
      logger.info("Tool called: amend_survey_closure", input);
      const result = await amendSurveyClosure(input);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "get_express_interest_report",
    `Fetch the express interest (demand capture) report for a specific course.

WHAT IT DOES:
Retrieves data on how many learners expressed interest in a course, with regional breakdowns and a downloadable report. This data is used for planning and go/no-go decisions.

WHEN TO USE:
- A Learning Advisor wants to know how many people expressed interest in a course.
- A stakeholder needs demand data for planning upcoming offerings.
- The planning team needs interest data for go/no-go decisions.

WHEN NOT TO USE:
- If the question is about how express interest works (policy/process) — use the express_interest_knowledge resource.
- If the question is about enrollment numbers (confirmed seats) — use get_enrollment_status.

INPUT DETAILS:
- courseId: REQUIRED — the course to query demand data for.
- dateRange: Optional filter with startDate and endDate.
- requestedBy: Requesting Learning Advisor.

OUTPUT:
Total interested learners, regional breakdown, downloadable CSV URL, and planning note.

EXAMPLE PROMPTS:
- "Can we get the express interest list for CRS-1001?"
- "How many people expressed interest in Leadership Essentials?"
- "Get the demand data for planning next quarter's offerings"
- "Pull the express interest report for the last 6 months"`,
    GetExpressInterestReportSchema.shape,
    async (input) => {
      logger.info("Tool called: get_express_interest_report", input);
      const result = await getExpressInterestReport(input);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
