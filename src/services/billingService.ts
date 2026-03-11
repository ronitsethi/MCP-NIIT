import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import { MOCK_COURSES } from "../data/mockData.js";
import type { CheckCourseBillingInfoInput } from "../schemas/billingSchemas.js";

export async function checkCourseBillingInfo(input: CheckCourseBillingInfoInput) {
  await mockDelay();
  const course = MOCK_COURSES.find((c) => c.courseId === input.courseId);

  if (!course) {
    return buildToolResponse("check_course_billing_info", false, `No course found with ID ${input.courseId}.`, {
      courseId: input.courseId,
      error: "Course not found. Please verify the course ID.",
    });
  }

  const participantType = input.participantType ?? "internal";
  const billingScenarios: Record<string, { billingOwner: string; notes: string }> = {
    internal: {
      billingOwner: "Home business unit of the learner",
      notes: "Internal participants are typically not charged a participation fee but their business unit bears the cost allocation.",
    },
    external: {
      billingOwner: "External participant's sponsoring organization",
      notes: `External fee: $${course.fees.external}. Invoice is generated post-completion. Cancellation fees may apply per cancellation policy.`,
    },
    jvn: {
      billingOwner: "Joint venture entity per inter-company billing agreement",
      notes: `JVN fee: $${course.fees.jvn}. Cross-entity billing is handled via the inter-company settlement process. Confirm billing entity code before enrollment.`,
    },
    ov: {
      billingOwner: "Overseas venture entity per regional billing agreement",
      notes: `OV participants follow the same billing path as JVN. Fee: $${course.fees.jvn}. Verify regional billing codes.`,
    },
  };

  const scenario = billingScenarios[participantType] ?? billingScenarios["internal"];

  return buildToolResponse("check_course_billing_info", true, `Billing information retrieved for ${course.title}.`, {
    courseId: course.courseId,
    courseTitle: course.title,
    category: course.category,
    participantType,
    billingOwner: scenario.billingOwner,
    billingNotes: scenario.notes,
    billingScenario: input.billingScenario ?? "standard",
    feeStructure: course.fees,
    escalationPath: "For billing disputes or exceptions, contact the Finance Shared Services team.",
  }, {
    relatedResource: "billing_and_fee_management_knowledge",
    nextRecommendedStep: "Confirm the billing entity code with the participant's manager before processing enrollment.",
  });
}
