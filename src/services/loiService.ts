import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import type { ProcessLoiRequestInput } from "../schemas/loiSchemas.js";

export async function processLoiRequest(input: ProcessLoiRequestInput) {
  await mockDelay();

  const guidanceMap: Record<string, string> = {
    save_failure: "A save failure is typically caused by session timeout or network issues. Advise the learner to clear browser cache, use a supported browser (Chrome/Edge), and retry. If the issue persists, a support ticket has been raised.",
    draft_not_generated: "Draft generation depends on all prerequisite fields being completed. Verify that all required course completion and assessment fields are filled. A support ticket has been created for backend investigation.",
    request_too_early: "LOI requests can only be submitted within the eligible window (typically after course completion and before the LOI deadline). The learner has been notified of the eligible date range.",
    general_support: "General LOI support request logged. The LOI administration team will review and respond within 2 business days.",
  };

  return buildToolResponse("process_loi_request", true, "LOI request has been processed.", {
    userId: input.userId ?? "unknown",
    offeringId: input.offeringId ?? "unknown",
    issueType: input.issueType,
    guidance: guidanceMap[input.issueType],
    requestedBy: input.requestedBy,
    notes: input.notes ?? null,
    ticketReference: `LOI-${Date.now().toString(36).toUpperCase()}`,
    ticketStatus: "open",
    goStatusNote: input.issueType === "request_too_early"
      ? "LOI is not yet eligible. No action needed until the eligibility window opens."
      : "LOI support ticket is active. Monitor for updates.",
  }, {
    nextRecommendedStep: "Check the ticket for updates within 2 business days. If the issue is blocking a deadline, escalate via the LOI admin channel.",
    relatedResource: "loi_management_knowledge",
  });
}
