import type { ResourceContent } from "../types/common.js";

export const completionResources: Record<string, ResourceContent> = {
  completion_dispute_policy_knowledge: {
    title: "Completion Dispute Policy & Resolution Process",
    domain: "complianceOrCompletion",
    overview:
      "Explains how completion disputes are handled, who has authority to make pass/fail decisions, what evidence is used, and the role of the Learning Advisor in the dispute process. Covers the distinction between LEM's administrative role and the course owner's decision authority.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about completion disputes, how pass/fail decisions are made, or what to do when a learner challenges their completion status. For fetching attendance evidence, use the get_attendance_evidence tool.",
    keyRules: [
      "The course owner has final authority on pass/fail decisions — the LEM team cannot override this.",
      "Disputes are initiated by the learner via the Learning Advisor.",
      "The Learning Advisor's role is to gather and present evidence (attendance records, assessment scores) to the course owner for review.",
      "Evidence includes: system-recorded attendance, signed attendance sheets, assessment results, and facilitator notes.",
      "The course owner reviews the evidence and makes a final decision. This decision is documented and communicated back to the learner.",
      "If the learner disagrees with the course owner's decision, they may escalate through the formal learning grievance process.",
      "Completion status can only be changed by the course owner or the LMS admin team upon course owner instruction.",
    ],
    commonMisconceptions: [
      "The LEM team does not make pass/fail decisions — this is solely the course owner's authority.",
      "Attendance alone does not guarantee a pass — assessment results may also be required.",
      "A dispute does not automatically change the learner's status — it triggers a review process.",
    ],
    escalationPath:
      "Learning Advisor → Course Owner (for decision). If course owner is unresponsive, escalate to DRC. If learner disagrees with decision, formal learning grievance process.",
    relatedTools: ["get_attendance_evidence"],
    exampleQuestions: [
      "How are completion disputes handled?",
      "Who makes final pass/fail decisions?",
      "What evidence is used for completion disputes?",
      "A learner disputes their fail status — what should I do?",
      "Can the LEM team change a learner's completion status?",
    ],
  },

  attendance_and_completion_knowledge: {
    title: "Attendance & Completion Tracking",
    domain: "complianceOrCompletion",
    overview:
      "Explains how attendance is tracked, how completion status is determined, and the relationship between attendance, assessment, and final completion status.",
    whenThisApplies:
      "Use this resource when a Learning Advisor needs to understand attendance tracking methods or completion determination logic. For fetching specific attendance records, use the get_attendance_evidence tool.",
    keyRules: [
      "Attendance is tracked via: LMS session logs (virtual), physical sign-in sheets (face-to-face), or facilitator manual entry.",
      "Completion requires meeting BOTH attendance threshold (typically 80%+) AND assessment requirements (if applicable).",
      "Attendance data is the primary evidence in completion disputes.",
      "The facilitator is responsible for marking attendance — the LEM team manages the system records.",
      "Completion status is finalized within 5 business days after the offering end date.",
    ],
    relatedTools: ["get_attendance_evidence"],
    exampleQuestions: [
      "How is attendance tracked?",
      "What determines completion status?",
      "What is the attendance threshold for completion?",
      "When is completion status finalized?",
    ],
  },

  aar_sessions_knowledge: {
    title: "After-Action Review (AAR) Sessions",
    domain: "postDelivery",
    overview:
      "Explains what happens in after-action review sessions, what is discussed, who participates, and when LEM involvement is needed. AARs are post-delivery reviews focused on improving future offerings.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about AAR sessions, what happens in them, or whether they need to participate.",
    keyRules: [
      "AARs are conducted within 2 weeks after offering delivery.",
      "Participants typically include: facilitator, course owner, Learning Advisor, and optionally a learner representative.",
      "Discussion topics: delivery effectiveness, logistics issues, learner feedback highlights, improvement opportunities, and action items for next offering.",
      "LEM involvement is needed when logistics issues were reported (venue, hosting, workspace, catering problems).",
      "Action items from AARs are documented and tracked. The Learning Advisor ensures LEM-owned actions are followed up.",
      "AAR notes are stored in the course repository for future reference.",
    ],
    commonMisconceptions: [
      "AARs are not optional — they are a standard part of the quality assurance process.",
      "AARs are not the same as survey reviews — surveys provide learner feedback, AARs provide operational feedback.",
      "The Learning Advisor does not lead the AAR (the course owner does) but must attend when logistics topics are on the agenda.",
    ],
    relatedTools: [],
    exampleQuestions: [
      "What happens in after-action review sessions?",
      "What is discussed in an AAR?",
      "When is LEM involvement needed in AARs?",
      "Who participates in AAR sessions?",
      "How soon after delivery should an AAR happen?",
    ],
  },
};
