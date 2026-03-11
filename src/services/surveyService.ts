import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import { MOCK_SURVEY_DATA } from "../data/mockData.js";
import type { ReopenSurveyWindowInput, GetSurveyReportInput, AmendSurveyClosureInput, GetExpressInterestReportInput } from "../schemas/surveySchemas.js";

export async function reopenSurveyWindow(input: ReopenSurveyWindowInput) {
  await mockDelay();
  return buildToolResponse("reopen_survey_window", true, "Survey window reopen request has been submitted successfully.", {
    requestStatus: "submitted",
    offeringId: input.offeringId ?? MOCK_SURVEY_DATA.offeringId,
    courseId: input.courseId ?? "CRS-1001",
    effectiveOpenFrom: input.requestedOpenFrom ?? new Date().toISOString().split("T")[0],
    effectiveOpenUntil: input.requestedOpenUntil,
    reason: input.reason,
    requestedBy: input.requestedBy,
    approvalRequired: true,
    estimatedProcessingTime: "1-2 business days",
  }, {
    nextRecommendedStep: "Monitor the request status. Approval is typically processed within 1-2 business days. Check with the survey administration team if urgent.",
    relatedResource: "survey_management_knowledge",
  });
}

export async function getSurveyReport(input: GetSurveyReportInput) {
  await mockDelay();
  const base = MOCK_SURVEY_DATA;
  return buildToolResponse("get_survey_report", true, `Survey ${input.reportType} report generated successfully.`, {
    offeringId: input.offeringId ?? base.offeringId,
    courseId: input.courseId ?? "CRS-1001",
    reportType: input.reportType,
    totalParticipants: base.totalParticipants,
    responsesReceived: base.responsesReceived,
    responseRate: base.responseRate,
    averageRating: base.averageRating,
    surveyCloseDate: base.surveyCloseDate,
    reportUrl: base.reportUrl,
    generatedAt: new Date().toISOString(),
  }, {
    relatedResource: "survey_management_knowledge",
  });
}

export async function amendSurveyClosure(input: AmendSurveyClosureInput) {
  await mockDelay();
  return buildToolResponse("amend_survey_closure", true, "Survey closure amendment request has been submitted.", {
    offeringId: input.offeringId,
    previousCloseDate: input.currentCloseDate ?? MOCK_SURVEY_DATA.surveyCloseDate,
    newRequestedCloseDate: input.requestedCloseDate,
    reason: input.reason,
    requestedBy: input.requestedBy,
    amendmentStatus: "pending_approval",
    approvalWorkflow: "Requires survey admin approval. Standard turnaround: 1 business day.",
  }, {
    nextRecommendedStep: "Await approval notification. If the amendment is time-sensitive, escalate to the survey administration manager.",
    relatedResource: "survey_closure_policy_knowledge",
  });
}

export async function getExpressInterestReport(input: GetExpressInterestReportInput) {
  await mockDelay();
  return buildToolResponse("get_express_interest_report", true, "Express interest report retrieved successfully.", {
    courseId: input.courseId,
    dateRange: input.dateRange ?? { startDate: "2026-01-01", endDate: "2026-03-31" },
    totalInterestedLearners: 47,
    breakdownByRegion: [
      { region: "APAC", count: 22 },
      { region: "EMEA", count: 15 },
      { region: "Americas", count: 10 },
    ],
    downloadUrl: `https://lms.example.com/reports/express-interest/${input.courseId}.csv`,
    generatedAt: new Date().toISOString(),
    note: "Express interest captures demand signals only. It does not trigger notifications to learners or guarantee enrollment.",
  }, {
    relatedResource: "express_interest_knowledge",
    nextRecommendedStep: "Review the demand data to inform go/no-go decisions for future offerings.",
  });
}
