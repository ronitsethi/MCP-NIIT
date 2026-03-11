import type { ResourceContent } from "../types/common.js";

export const hostingResources: Record<string, ResourceContent> = {
  hosting_services_knowledge: {
    title: "Hosting Services: Full vs Light Hosting",
    domain: "hosting",
    overview:
      "Explains the two hosting models available for course delivery: Full Hosting and Light Hosting. Covers support levels, session-duration implications, when each model is appropriate, and decision criteria for Learning Advisors when recommending hosting options to course owners.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about hosting models, the difference between full and light hosting, or needs guidance on which hosting option to recommend for a specific course.",
    keyRules: [
      "Full Hosting: LEM provides end-to-end virtual delivery support — session launch, technical moderation, breakout room management, chat monitoring, recording management, and post-session file handling.",
      "Light Hosting: LEM provides session launch/setup support and basic technical standby. The facilitator manages their own delivery without active LEM moderation.",
      "Full Hosting is recommended for sessions > 2 hours, sessions with breakout rooms, sessions with large participant groups (20+), or high-profile executive programs.",
      "Light Hosting is suitable for short sessions (< 2 hours), small groups, or sessions where the facilitator is experienced and self-sufficient.",
      "Both hosting options should be presented to the course owner during setup. The course owner makes the final decision.",
      "Hosting preference must be documented in the course guide CI section before offering creation.",
    ],
    commonMisconceptions: [
      "Light hosting does not mean no hosting — LEM still sets up the session and provides standby support.",
      "The choice of hosting model does not affect the platform — both use the same MS Teams or virtual platform.",
      "Hosting type can change per offering of the same course if the course owner requests it.",
      "Light hosting does not reduce the preparation timeline — setup requirements remain the same.",
    ],
    escalationPath:
      "If a course owner is unsure which model to choose, the Learning Advisor should schedule a brief call with the LEM hosting coordinator to walk through the options.",
    requiredInputs: [
      "Session duration",
      "Expected participant count",
      "Facilitator's virtual delivery experience",
      "Presence of breakout rooms or interactive exercises",
    ],
    relatedTools: [],
    exampleQuestions: [
      "What is full hosting vs light hosting?",
      "How does light hosting work for short sessions?",
      "When should both hosting options be presented?",
      "Which hosting model is better for a 3-hour session with 30 participants?",
      "Can we switch from light hosting to full hosting mid-cycle?",
    ],
  },
};
