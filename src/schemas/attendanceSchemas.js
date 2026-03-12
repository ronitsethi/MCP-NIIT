import { z } from "zod";
export const GetAttendanceEvidenceSchema = z.object({
    userId: z.string().describe("User/learner identifier to retrieve attendance evidence for"),
    offeringId: z.string().describe("Offering identifier to check attendance against"),
});
