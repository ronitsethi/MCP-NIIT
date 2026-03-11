import type { ResourceContent } from "../types/common.js";

export const logisticsResources: Record<string, ResourceContent> = {
  catering_services_knowledge: {
    title: "Catering Services & Requirements",
    domain: "logistics",
    overview:
      "Explains catering requirements for face-to-face sessions, minimum participant thresholds, location-specific differences, and how catering logistics interact with venue and offering planning.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about catering policies, minimum counts, or how catering works at different locations.",
    keyRules: [
      "Catering is available for face-to-face sessions only — not applicable for virtual or hybrid.",
      "Minimum participant count for catering orders is typically 8 (may vary by location/vendor).",
      "Catering requests must be submitted at least 5 business days before the session.",
      "Location differences: some venues have in-house catering (included in room booking), others require external vendor coordination.",
      "Dietary requirements should be collected during enrollment and communicated to the catering provider at least 3 days before.",
      "Catering costs are typically included in the course delivery budget — not charged separately to participants.",
      "Cancellation of catering orders less than 2 business days before the event may incur cancellation charges from the vendor.",
    ],
    commonMisconceptions: [
      "Catering is not automatic with room booking — it must be requested separately unless the venue includes it.",
      "Minimum counts apply per order, not per day — multi-day sessions need separate daily orders.",
    ],
    relatedTools: ["book_training_room"],
    exampleQuestions: [
      "What are the catering requirements?",
      "Are minimum participant counts needed for catering?",
      "How do location differences affect catering?",
      "When do I need to submit a catering request?",
    ],
  },

  go_no_go_policy_knowledge: {
    title: "Go/No-Go Decision Policy & SLA",
    domain: "logistics",
    overview:
      "Explains the go/no-go decision process, SLA timelines, why timing matters for logistics, and the consequences of late decisions. Addresses the common complaint about go/no-go decisions happening too late.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about go/no-go timelines, why decisions are late, or what SLAs apply.",
    keyRules: [
      "Go/no-go for face-to-face: decision must be made at least 10 business days before session start.",
      "Go/no-go for virtual: decision must be made at least 5 business days before session start.",
      "Late go/no-go decisions put at risk: room bookings (cancellation charges), catering orders (cancellation charges), facilitator scheduling, and learner communications.",
      "The course owner is responsible for making the go/no-go decision based on enrollment numbers and business need.",
      "If the minimum enrollment threshold is not met and no go decision is made, the offering is cancelled and stakeholders are notified.",
      "Repeated late go/no-go decisions should be flagged in the AAR and escalated to the DRC for process improvement.",
    ],
    commonMisconceptions: [
      "Late go/no-go is not just an inconvenience — it has real cost implications (venue and catering cancellation fees).",
      "The LEM team does not make go/no-go decisions — they can only flag the timeline and escalate.",
      "A 'no-go' does not necessarily mean the course is cancelled — it may be rescheduled.",
    ],
    escalationPath:
      "If go/no-go deadline is approaching with no decision: Learning Advisor → Course Owner. If unresponsive: escalate to DRC.",
    relatedTools: [],
    exampleQuestions: [
      "Why are go/no-go decisions happening late?",
      "What SLA applies to face-to-face logistics?",
      "Why are go/no-go timing rules important?",
      "What happens if go/no-go is decided late?",
      "Who is responsible for making the go/no-go decision?",
    ],
  },

  cancellation_policy_knowledge: {
    title: "Cancellation Policy — Timelines, Charges & Waivers",
    domain: "logistics",
    overview:
      "Explains what happens when learners cancel after the deadline, whether charges still apply, when waivers are possible, and the decision nuances around cancellation timelines.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about cancellation rules, late cancellation charges, or waiver possibilities.",
    keyRules: [
      "Free cancellation: more than 10 business days before session start.",
      "Late cancellation (within 10 business days): full course fee applies. The learner's business unit is charged.",
      "No-show: treated as a late cancellation — full fee applies.",
      "Waivers for late cancellation are possible but require course owner AND finance approval.",
      "Valid waiver reasons include: medical emergency (with documentation), organizational restructuring, or management directive.",
      "Approved waivers must be documented in the CRM for audit purposes.",
      "Cancellation of external participants follows the same timeline but invoicing adjustments require Finance Shared Services processing.",
    ],
    commonMisconceptions: [
      "Late cancellation is not free — the full fee is charged to the business unit.",
      "The Learning Advisor cannot approve waivers — this requires course owner + finance joint approval.",
      "Cancelling enrollment does not automatically cancel associated logistics (room, catering) — these must be managed separately.",
    ],
    escalationPath:
      "For waiver requests: Learning Advisor → Course Owner + Finance Shared Services. For disputes: formal billing dispute process.",
    relatedTools: ["get_course_fee_info", "check_course_billing_info"],
    exampleQuestions: [
      "What happens when a learner cancels after the deadline?",
      "Do cancellation charges still apply?",
      "When are waivers possible?",
      "If a learner cancels after the deadline, do charges still apply?",
      "How do I request a cancellation waiver?",
    ],
  },
};
