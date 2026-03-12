import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
import type { GetAttendanceEvidenceInput } from "../schemas/attendanceSchemas.js";

export async function getAttendanceEvidence(input: GetAttendanceEvidenceInput) {
  const result = await query(
    "SELECT * FROM attendance WHERE user_id = $1 AND offering_id = $2",
    [input.userId, input.offeringId]
  );
  const record = result.rows[0];

  if (!record) {
    return buildToolResponse("get_attendance_evidence", false, `No attendance record found for user ${input.userId} in offering ${input.offeringId}.`, {
      userId: input.userId,
      offeringId: input.offeringId,
      error: "No matching attendance record. Verify user ID and offering ID, or check if the offering has concluded.",
    });
  }

  return buildToolResponse("get_attendance_evidence", true, "Attendance evidence retrieved successfully.", {
    userId: record.user_id,
    offeringId: record.offering_id,
    sessionsAttended: record.sessions_attended,
    totalSessions: record.total_sessions,
    attendancePercentage: Math.round((record.sessions_attended / record.total_sessions) * 100),
    currentStatus: record.status,
    evidenceLinks: typeof record.evidence_links === 'string' ? JSON.parse(record.evidence_links) : record.evidence_links,
    decisionRoutingNote: record.status === "fail"
      ? "The learner's current status is 'fail'. If the learner disputes this, the course owner must review the attendance evidence and make the final pass/fail decision. The LEM team cannot override course-owner decisions."
      : "The learner's attendance record supports a 'pass' status. No dispute action is needed unless the learner raises a concern.",
  }, {
    relatedResource: "completion_dispute_policy_knowledge",
    nextRecommendedStep: record.status === "fail"
      ? "Share the evidence links with the course owner for review. The course owner has final authority on pass/fail decisions."
      : undefined,
  });
}
