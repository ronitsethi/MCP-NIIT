import { GetAttendanceEvidenceSchema } from "../schemas/attendanceSchemas.js";
import { getAttendanceEvidence } from "../services/attendanceService.js";
import { logger } from "../utils/logger.js";
export function registerAttendanceTools(server) {
    server.tool("get_attendance_evidence", `Retrieve attendance records and evidence relevant to completion disputes for a specific learner and offering.

WHAT IT DOES:
Returns the learner's attendance summary (sessions attended, total sessions, attendance percentage), current pass/fail status, evidence links (system logs, sign-in sheets), and decision routing guidance for dispute resolution.

WHEN TO USE:
- A learner disputes their pass/fail status and claims they attended all sessions.
- A Learning Advisor needs attendance evidence for a completion dispute review.
- A course owner requests evidence to make a pass/fail decision.

WHEN NOT TO USE:
- If the question is about how completion disputes are handled in general — use the completion_dispute_policy_knowledge resource.
- If the question is about what determines completion — use the attendance_and_completion_knowledge resource.
- If the issue is about system access (not completion) — use resolve_technical_access_issue.

INPUT DETAILS:
- userId: REQUIRED — the learner to retrieve evidence for.
- offeringId: REQUIRED — the offering to check attendance against.

OUTPUT:
Sessions attended, total sessions, attendance percentage, current status, evidence links, and decision routing note (who has authority to change the status).

BUSINESS ASSUMPTIONS:
- The course owner has final authority on pass/fail — the LEM team cannot override.
- Attendance evidence is the primary input for dispute resolution.
- Evidence links point to system records and sign-in sheets.

EXAMPLE PROMPTS:
- "Learner disputes completion status — can you fetch attendance evidence?"
- "Get attendance records for learner USR-3002 in offering OFF-2001"
- "Learner marked fail but claims full attendance — need evidence"
- "Pull attendance evidence for dispute review"`, GetAttendanceEvidenceSchema.shape, async (input) => {
        logger.info("Tool called: get_attendance_evidence", input);
        const result = await getAttendanceEvidence(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
