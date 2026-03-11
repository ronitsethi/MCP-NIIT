import { z } from "zod";

export const ProcessLoiRequestSchema = z.object({
  userId: z.string().optional().describe("User/learner identifier if known"),
  offeringId: z.string().optional().describe("Offering identifier associated with the LOI"),
  issueType: z.enum(["save_failure", "draft_not_generated", "request_too_early", "general_support"]).describe("Classification of the LOI issue"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
  notes: z.string().optional().describe("Additional context or details about the LOI issue"),
});

export type ProcessLoiRequestInput = z.infer<typeof ProcessLoiRequestSchema>;
