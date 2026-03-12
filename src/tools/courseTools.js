import { GetCourseFeeInfoSchema } from "../schemas/courseSchemas.js";
import { getCourseFeeInfo } from "../services/courseService.js";
import { logger } from "../utils/logger.js";
export function registerCourseTools(server) {
    server.tool("get_course_fee_info", `Return fee information for a specific course, optionally filtered by participant type and billing scenario.

WHAT IT DOES:
Retrieves the fee structure for a course including internal, external, and JVN/OV rates. Optionally provides scenario-specific notes (cancellation fees, transfer fees, no-show charges).

WHEN TO USE:
- A Learning Advisor asks about fees for a specific course.
- A stakeholder wants to know cancellation charges for a specific course.
- The advisor needs external fees for a specific course before enrollment.

WHEN NOT TO USE:
- If the question is about fee categories, levels, or how fees work in general — use the course_categories_and_fees_knowledge resource.
- If the question is about who gets billed (billing owner) — use check_course_billing_info.
- If the question is about cancellation policies in general — use the cancellation_policy_knowledge resource.

INPUT DETAILS:
- courseId: REQUIRED — the course to look up fees for.
- participantType: Optional filter (e.g., "internal", "external", "jvn").
- scenario: Optional scenario (e.g., "cancellation", "transfer", "no-show").

OUTPUT:
Fee structure by participant type, category, duration, delivery mode, scenario-specific notes, and cancellation policy reference.

EXAMPLE PROMPTS:
- "What are the fees for CRS-1001?"
- "What charges apply on cancellation for Leadership Essentials?"
- "What are external fees for this specific course?"
- "What is the no-show charge for CRS-1002?"
- "Get fee details for Project Management Foundations"`, GetCourseFeeInfoSchema.shape, async (input) => {
        logger.info("Tool called: get_course_fee_info", input);
        const result = await getCourseFeeInfo(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
