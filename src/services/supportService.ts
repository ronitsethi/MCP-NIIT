import { buildToolResponse } from "../utils/response.js";
import type { ResolveTechnicalAccessIssueInput } from "../schemas/supportSchemas.js";

export async function resolveTechnicalAccessIssue(input: ResolveTechnicalAccessIssueInput) {
  const escalationMap: Record<string, string> = {
    moodle: "LMS Support Team (Tier-2)",
    sharepoint: "Microsoft 365 Administration Team",
    ms_teams: "Microsoft 365 Administration Team",
    workday: "HR Systems / Workday Admin Team",
    other: "General IT Service Desk",
  };

  const assignedTeam = escalationMap[input.systemName] ?? "General IT Service Desk";

  return buildToolResponse("resolve_technical_access_issue", true, `Technical access issue for ${input.systemName} has been logged and routed to ${assignedTeam}.`, {
    userId: input.userId,
    systemName: input.systemName,
    issueType: input.issueType,
    participantType: input.participantType ?? "unknown",
    courseId: input.courseId ?? null,
    offeringId: input.offeringId ?? null,
    resolutionAttempt: "Initial diagnostic check complete — no immediate auto-resolution available.",
    assignedTeam,
    ticketReference: `TKT-${Date.now().toString(36).toUpperCase()}`,
    ticketStatus: "open",
    estimatedResolution: "4-8 business hours",
    notes: input.participantType === "external" || input.participantType === "jvn"
      ? "External/JVN participants may have restricted access by design. Check workspace access policy before escalating."
      : "Verify that the learner's account is active and has correct role assignments.",
  }, {
    nextRecommendedStep: "Monitor the ticket status. If the learner is blocked from an imminent session, flag as urgent with the assigned team.",
    relatedResource: "system_access_support_knowledge",
  });
}
