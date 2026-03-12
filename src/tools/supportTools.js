import { ResolveTechnicalAccessIssueSchema } from "../schemas/supportSchemas.js";
import { resolveTechnicalAccessIssue } from "../services/supportService.js";
import { logger } from "../utils/logger.js";
export function registerSupportTools(server) {
    server.tool("resolve_technical_access_issue", `Log and route a learner-facing technical access issue across enterprise systems (Moodle, SharePoint, MS Teams, Workday, or other).

WHAT IT DOES:
Creates a support ticket for a learner who cannot access a required system. Performs an initial diagnostic check and routes the issue to the correct support team. Returns ticket reference, assigned team, and estimated resolution time.

WHEN TO USE:
- A learner cannot access Moodle (login failure, course not visible, permission denied).
- A learner cannot access SharePoint (files not loading, permission error).
- A learner cannot join or access MS Teams (meeting link issues, channel access denied).
- A learner has a Workday account issue (especially external/JVN participants).
- Any other system access problem that blocks a learner from participating.

WHEN NOT TO USE:
- If the question is about WHY external participants have restricted access or what the policies are — use the system_access_support_knowledge or workspace_access_issue_knowledge resource.
- If the issue is about workspace content visibility (not system access) — read the workspace_access_issue_knowledge resource first.
- If the issue is about survey access — use reopen_survey_window instead.

INPUT DETAILS:
- userId: REQUIRED — the learner's user identifier.
- systemName: REQUIRED — which system: "moodle", "sharepoint", "ms_teams", "workday", or "other".
- issueType: REQUIRED — description of the issue (e.g., "cannot login", "permission denied", "page not loading").
- participantType: Participant type if known (internal, external, jvn, ov, contractor).
- courseId: Related course identifier if applicable.
- offeringId: Related offering identifier if applicable.

OUTPUT:
Ticket reference, assigned support team, estimated resolution time, and contextual notes (especially for external participants).

BUSINESS ASSUMPTIONS:
- External/JVN/OV participants may have restricted access by design (tenant security).
- The LEM team cannot grant system-level permissions — they can only escalate.
- Standard resolution time is 4-8 business hours.

EXAMPLE PROMPTS:
- "Learner cannot access Moodle"
- "Learner USR-3002 cannot access SharePoint files"
- "External participant having issues with MS Teams meeting"
- "Workday account issue for JVN participant"
- "Learner is getting permission denied on the learning platform"`, ResolveTechnicalAccessIssueSchema.shape, async (input) => {
        logger.info("Tool called: resolve_technical_access_issue", input);
        const result = await resolveTechnicalAccessIssue(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
