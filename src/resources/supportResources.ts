import type { ResourceContent } from "../types/common.js";

export const supportResources: Record<string, ResourceContent> = {
  system_access_support_knowledge: {
    title: "System Access Support — Moodle, SharePoint, Teams, Workday",
    domain: "support",
    overview:
      "Explains common system access issues learners face across Moodle, SharePoint, MS Teams, and Workday, the typical causes, initial troubleshooting steps, and escalation paths. Covers differences in access for internal vs external participants.",
    whenThisApplies:
      "Use this resource when a Learning Advisor reports a learner access issue and needs guidance on troubleshooting steps or who to escalate to. For creating a support ticket, use the resolve_technical_access_issue tool.",
    keyRules: [
      "Moodle: common issues include expired accounts, incorrect role assignments, and browser compatibility. First step: verify the learner's Moodle account is active.",
      "SharePoint: external participants may have limited access due to tenant policies. Verify guest access configuration.",
      "MS Teams: meeting join issues often stem from calendar invitation errors or VPN/firewall restrictions. Verify the meeting link and the learner's network settings.",
      "Workday: account issues for external participants require HR Systems team intervention — the LEM team cannot modify Workday accounts.",
      "External/JVN/OV participants have inherently restricted access. Some limitations cannot be resolved — they are by design.",
      "Always capture: user ID, system name, error message (if any), participant type, and offering context before escalating.",
    ],
    commonMisconceptions: [
      "Not all access issues are technical problems — some are by-design restrictions for external participants.",
      "The LEM team cannot grant system-level permissions — they can only escalate to the correct admin team.",
      "Resetting a password does not fix permission issues — these are separate concerns.",
    ],
    escalationPath:
      "Moodle → LMS Support (Tier-2). SharePoint/Teams → M365 Admin Team. Workday → HR Systems Team. Unknown → General IT Service Desk.",
    relatedTools: ["resolve_technical_access_issue"],
    exampleQuestions: [
      "Learner cannot access Moodle",
      "Learner cannot access SharePoint or Teams",
      "Workday account issue for external participants",
      "What are the common causes of system access issues?",
      "Who do I escalate access issues to?",
    ],
  },

  loi_management_knowledge: {
    title: "LOI (Letter of Intent) Management",
    domain: "support",
    overview:
      "Explains the LOI process, common issues (save failures, draft not generating, premature requests), eligibility windows, and troubleshooting guidance. Covers the LOI lifecycle from eligibility to issuance.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about how LOI works, common LOI issues, or eligibility rules. For processing a specific LOI issue, use the process_loi_request tool.",
    keyRules: [
      "LOI eligibility opens after course completion is confirmed — not before.",
      "The eligibility window is typically 30 days after completion confirmation.",
      "LOI drafts are auto-generated once the learner initiates the request within the eligibility window.",
      "Save failures are usually caused by session timeouts, unsupported browsers, or incomplete prerequisite data.",
      "Draft not generated typically means a prerequisite field (attendance, assessment) is missing from the course completion record.",
      "Premature LOI requests (before eligibility) should be redirected — inform the learner of their eligibility date.",
      "For persistent technical issues, a support ticket should be raised with the LOI admin team.",
    ],
    commonMisconceptions: [
      "LOI is not automatic — the learner must initiate the request.",
      "LOI cannot be requested before course completion, even if the learner 'knows they will pass'.",
      "LOI failures are usually data issues, not system bugs.",
    ],
    escalationPath:
      "For technical LOI issues: LOI Admin Team. For eligibility disputes: Course Owner (who confirms completion).",
    relatedTools: ["process_loi_request"],
    exampleQuestions: [
      "How does the LOI process work?",
      "LOI is not saving — what should I do?",
      "LOI draft is not generating — why?",
      "Learner is requesting LOI too early — how do I respond?",
      "What is the LOI eligibility window?",
    ],
  },
};
