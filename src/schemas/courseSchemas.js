import { z } from "zod";
export const GetCourseFeeInfoSchema = z.object({
    courseId: z.string().describe("Course identifier to retrieve fee information for"),
    participantType: z.string().optional().describe("Participant type filter (e.g. 'internal', 'external', 'jvn')"),
    scenario: z.string().optional().describe("Specific scenario to check fees for (e.g. 'cancellation', 'transfer', 'no-show')"),
});
