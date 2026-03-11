import type { ResourceContent } from "../types/common.js";

export const billingResources: Record<string, ResourceContent> = {
  billing_and_fee_management_knowledge: {
    title: "Billing & Fee Management — Policies and Processes",
    domain: "billing",
    overview:
      "Explains how billing works for different participant types (internal, external, JVN, OV), cross-entity billing processes, inter-company settlements, cancellation charges, and cost allocation. Covers both the policy framework and the operational process.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about billing policies, who pays, or how cross-entity charges work. For specific course billing lookups, use the related tools.",
    keyRules: [
      "Internal participants: cost is allocated to their home business unit via internal cost transfer. No direct invoice.",
      "External participants: invoiced directly at the published external fee rate. Invoice generated post-completion.",
      "JVN/OV participants: billed via inter-company settlement at the JVN rate (typically 50% of external fee).",
      "Cross-entity billing requires the billing entity code to be captured at enrollment time.",
      "Cancellation after the deadline incurs the full course fee — waivers require course owner + finance approval.",
      "Billing disputes are handled by the Finance Shared Services team. The LEM team can provide enrollment and attendance evidence but does not make billing decisions.",
      "No-show learners are billed at the full rate unless a VP-level exception is approved.",
    ],
    commonMisconceptions: [
      "Internal is not free — there is always a cost allocation.",
      "JVN billing is not the same as external billing — it goes through inter-company settlement, not direct invoicing.",
      "The Learning Advisor cannot waive or reduce fees — this requires finance + course owner joint approval.",
    ],
    escalationPath:
      "For billing disputes: Finance Shared Services. For fee exception requests: course owner → finance for joint approval.",
    relatedTools: ["check_course_billing_info", "get_course_fee_info"],
    exampleQuestions: [
      "Who gets billed for JVN/OV participants?",
      "How are cross-entity participants billed?",
      "What are the billing policies?",
      "Do cancellation charges apply after the deadline?",
      "How does inter-company billing work?",
    ],
  },
};
