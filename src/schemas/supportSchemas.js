import { z } from "zod";
export const ResolveTechnicalAccessIssueSchema = z.object({
    userId: z.string().describe("User/learner identifier experiencing the issue"),
    systemName: z.enum(["moodle", "sharepoint", "ms_teams", "workday", "other"]).describe("Which enterprise system the learner cannot access"),
    issueType: z.string().min(3).describe("Description of the access issue (e.g. 'cannot login', 'permission denied', 'page not loading')"),
    participantType: z.string().optional().describe("Participant type: internal, external, jvn, ov, contractor"),
    courseId: z.string().optional().describe("Related course identifier if applicable"),
    offeringId: z.string().optional().describe("Related offering identifier if applicable"),
});
