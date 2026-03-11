import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import { MOCK_OFFERINGS } from "../data/mockData.js";
import type { GetEnrollmentStatusInput } from "../schemas/enrollmentSchemas.js";

export async function getEnrollmentStatus(input: GetEnrollmentStatusInput) {
  await mockDelay();
  const offering = MOCK_OFFERINGS.find((o) => o.offeringId === input.offeringId);

  if (!offering) {
    return buildToolResponse("get_enrollment_status", false, `No offering found with ID ${input.offeringId}.`, {
      offeringId: input.offeringId,
      error: "Offering not found. Please verify the offering ID and try again.",
    });
  }

  return buildToolResponse("get_enrollment_status", true, `Enrollment status retrieved for offering ${input.offeringId}.`, {
    offeringId: offering.offeringId,
    courseId: offering.courseId,
    location: offering.location,
    startDate: offering.startDate,
    endDate: offering.endDate,
    status: offering.status,
    capacity: offering.capacity,
    enrolledCount: offering.enrolledCount,
    waitlistCount: offering.waitlistCount,
    seatsRemaining: offering.capacity - offering.enrolledCount,
    isAtCapacity: offering.enrolledCount >= offering.capacity,
    hasWaitlist: offering.waitlistCount > 0,
  }, {
    relatedResource: "learner_enrollment_knowledge",
    nextRecommendedStep: offering.enrolledCount >= offering.capacity
      ? "This offering is at capacity. Consider creating additional offerings or managing the waitlist."
      : undefined,
  });
}
