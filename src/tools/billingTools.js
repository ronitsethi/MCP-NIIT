import { CheckCourseBillingInfoSchema } from "../schemas/billingSchemas.js";
import { checkCourseBillingInfo } from "../services/billingService.js";
import { logger } from "../utils/logger.js";
export function registerBillingTools(server) {
    server.tool("check_course_billing_info", `Fetch billing-related information for a course, filtered by participant type and billing scenario.

WHAT IT DOES:
Returns billing owner, billing notes, fee structure, escalation path, and scenario-specific guidance for a course. Handles internal, external, JVN, OV, and cross-entity billing questions.

WHEN TO USE:
- A Learning Advisor asks who gets billed for a specific participant type (e.g., JVN, OV, external).
- A stakeholder needs to understand cross-entity billing for a course.
- The advisor needs to confirm the billing entity before processing enrollment.

WHEN NOT TO USE:
- If the question is about billing policies in general (not a specific course) — use the billing_and_fee_management_knowledge resource.
- If the question is about fee amounts only — use get_course_fee_info.
- If the question is about cancellation charges — check the cancellation_policy_knowledge resource first.

INPUT DETAILS:
- courseId: REQUIRED — the course to check billing for.
- participantType: Optional filter (e.g., "jvn", "ov", "external", "internal").
- billingScenario: Optional scenario (e.g., "cross-entity", "late-cancellation").

OUTPUT:
Billing owner, billing notes, fee structure, escalation path, and scenario context.

EXAMPLE PROMPTS:
- "Who gets billed for JVN/OV participants in CRS-1001?"
- "How are cross-entity participants billed for this course?"
- "What is the billing setup for external participants?"
- "Confirm billing owner for Leadership Essentials"`, CheckCourseBillingInfoSchema.shape, async (input) => {
        logger.info("Tool called: check_course_billing_info", input);
        const result = await checkCourseBillingInfo(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
