import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
export async function reopenSurveyWindow(input) {
    // Try to fetch survey data from DB for context
    const offeringId = input.offeringId ?? "OFF-2001";
    const surveyResult = await query("SELECT * FROM survey_data WHERE offering_id = $1", [offeringId]);
    const surveyRow = surveyResult.rows[0];
    return buildToolResponse("reopen_survey_window", true, "Survey window reopen request has been submitted successfully.", {
        requestStatus: "submitted",
        offeringId: surveyRow?.offering_id ?? offeringId,
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
export async function getSurveyReport(input) {
    const offeringId = input.offeringId ?? "OFF-2001";
    const surveyResult = await query("SELECT * FROM survey_data WHERE offering_id = $1", [offeringId]);
    const base = surveyResult.rows[0];
    if (!base) {
        return buildToolResponse("get_survey_report", false, `No survey data found for offering ${offeringId}.`, {
            offeringId,
            error: "Survey data not found.",
        });
    }
    return buildToolResponse("get_survey_report", true, `Survey ${input.reportType} report generated successfully.`, {
        offeringId: base.offering_id,
        courseId: input.courseId ?? "CRS-1001",
        reportType: input.reportType,
        totalParticipants: base.total_participants,
        responsesReceived: base.responses_received,
        responseRate: Number(base.response_rate),
        averageRating: Number(base.average_rating),
        surveyCloseDate: base.survey_close_date,
        reportUrl: base.report_url,
        generatedAt: new Date().toISOString(),
    }, {
        relatedResource: "survey_management_knowledge",
    });
}
export async function amendSurveyClosure(input) {
    const surveyResult = await query("SELECT * FROM survey_data WHERE offering_id = $1", [input.offeringId]);
    const surveyRow = surveyResult.rows[0];
    return buildToolResponse("amend_survey_closure", true, "Survey closure amendment request has been submitted.", {
        offeringId: input.offeringId,
        previousCloseDate: input.currentCloseDate ?? surveyRow?.survey_close_date ?? "unknown",
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
export async function getExpressInterestReport(input) {
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
