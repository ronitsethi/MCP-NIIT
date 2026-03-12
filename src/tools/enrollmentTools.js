import { GetEnrollmentStatusSchema } from "../schemas/enrollmentSchemas.js";
import { getEnrollmentStatus } from "../services/enrollmentService.js";
import { logger } from "../utils/logger.js";
export function registerEnrollmentTools(server) {
    server.tool("get_enrollment_status", `Fetch current enrollment numbers, capacity, and waitlist status for a specific offering.

WHAT IT DOES:
Returns real-time enrollment data including enrolled count, waitlist count, total capacity, seats remaining, and whether the offering is at capacity.

WHEN TO USE:
- A Learning Advisor asks how many learners are enrolled in an offering.
- A stakeholder wants to know the current enrollment status.
- The advisor needs to check if there is a waitlist or available seats before recommending an offering.
- Pre-go/no-go check: confirming whether minimum enrollment threshold is met.

WHEN NOT TO USE:
- If the question is about enrollment policies, processes, or how enrollment works — use the learner_enrollment_knowledge resource.
- If the advisor wants express interest data (not actual enrollment) — use get_express_interest_report.
- If the advisor needs to see what offerings exist — use get_upcoming_offerings.

INPUT DETAILS:
- offeringId: REQUIRED — the offering to check enrollment status for.

OUTPUT:
Enrolled count, waitlist count, capacity, seats remaining, at-capacity flag, and offering context (course, location, dates).

EXAMPLE PROMPTS:
- "How many learners are enrolled in OFF-2001?"
- "What is the current enrollment status?"
- "Is there a waitlist for this offering?"
- "Are there seats available for the Singapore session?"
- "Check enrollment for offering OFF-2003"`, GetEnrollmentStatusSchema.shape, async (input) => {
        logger.info("Tool called: get_enrollment_status", input);
        const result = await getEnrollmentStatus(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
