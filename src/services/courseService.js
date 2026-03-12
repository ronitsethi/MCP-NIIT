import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
export async function getCourseFeeInfo(input) {
    const result = await query("SELECT * FROM courses WHERE course_id = $1", [input.courseId]);
    const course = result.rows[0];
    if (!course) {
        return buildToolResponse("get_course_fee_info", false, `No course found with ID ${input.courseId}.`, {
            courseId: input.courseId,
            error: "Course not found. Please verify the course ID.",
        });
    }
    const scenarioNotes = {
        cancellation: `Cancellation charges depend on timing. Cancellations more than 10 business days before the session start are free. Cancellations within 10 business days may incur the full course fee. Late cancellation waivers are at the discretion of the course owner.`,
        transfer: `Transfers to another offering are free if done more than 5 business days before the original session start. Late transfers may be treated as a cancellation + new enrollment.`,
        "no-show": `No-shows are billed at the full course fee. The learner's business unit is charged. Exceptions require VP-level approval.`,
    };
    return buildToolResponse("get_course_fee_info", true, `Fee information retrieved for ${course.title}.`, {
        courseId: course.course_id,
        courseTitle: course.title,
        category: course.category,
        deliveryMode: course.delivery_mode,
        durationDays: course.duration_days,
        feeStructure: {
            internal: Number(course.fee_internal),
            external: Number(course.fee_external),
            jvn_ov: Number(course.fee_jvn),
        },
        participantType: input.participantType ?? "all",
        scenarioNotes: input.scenario ? (scenarioNotes[input.scenario] ?? "No specific notes for this scenario.") : null,
        cancellationPolicy: "Refer to cancellation_policy_knowledge resource for full details.",
    }, {
        relatedResource: "course_categories_and_fees_knowledge",
    });
}
