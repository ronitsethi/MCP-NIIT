import { ProcessLoiRequestSchema } from "../schemas/loiSchemas.js";
import { processLoiRequest } from "../services/loiService.js";
import { logger } from "../utils/logger.js";
export function registerLoiTools(server) {
    server.tool("process_loi_request", `Process a Letter of Intent (LOI) related support or workflow request.

WHAT IT DOES:
Handles LOI issues such as save failures, draft not generating, premature requests, or general LOI support. Creates a support ticket and returns actionable guidance specific to the issue type.

WHEN TO USE:
- A learner reports that the LOI form cannot save their data.
- The LOI draft is not being generated after course completion.
- A learner is requesting an LOI before the eligibility window opens.
- A Learning Advisor needs general LOI support or troubleshooting.

WHEN NOT TO USE:
- If the question is about how the LOI process works in general, eligibility rules, or LOI policies — use the loi_management_knowledge resource.
- If the issue is about system access (not LOI-specific) — use resolve_technical_access_issue.

INPUT DETAILS:
- userId: Learner identifier (optional).
- offeringId: Associated offering identifier (optional).
- issueType: REQUIRED — one of: "save_failure", "draft_not_generated", "request_too_early", "general_support".
- requestedBy: REQUIRED — name or email of the requesting Learning Advisor.
- notes: Additional context or details.

OUTPUT:
Issue-specific guidance, support ticket reference, ticket status, and go-status note.

BUSINESS ASSUMPTIONS:
- LOI eligibility opens only after course completion is confirmed.
- Save failures are typically session/browser issues, not system bugs.
- Draft generation depends on prerequisite data being complete.

EXAMPLE PROMPTS:
- "LOI is not saving for learner USR-3001"
- "LOI draft is not generating after course completion"
- "Learner is requesting LOI too early — offering hasn't ended yet"
- "Need LOI support for offering OFF-2001"
- "LOI cannot save data and draft is not generating"`, ProcessLoiRequestSchema.shape, async (input) => {
        logger.info("Tool called: process_loi_request", input);
        const result = await processLoiRequest(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
