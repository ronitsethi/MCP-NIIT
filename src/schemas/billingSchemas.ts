import { z } from "zod";

export const CheckCourseBillingInfoSchema = z.object({
  courseId: z.string().describe("Course identifier to query billing information for"),
  participantType: z.string().optional().describe("Participant type filter (e.g. 'jvn', 'ov', 'external', 'internal')"),
  billingScenario: z.string().optional().describe("Specific billing scenario to resolve (e.g. 'cross-entity', 'late-cancellation')"),
});

export type CheckCourseBillingInfoInput = z.infer<typeof CheckCourseBillingInfoSchema>;
