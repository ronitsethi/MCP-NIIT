import { z } from "zod";
export const GetEnrollmentStatusSchema = z.object({
    offeringId: z.string().describe("Offering identifier to query enrollment status for"),
});
