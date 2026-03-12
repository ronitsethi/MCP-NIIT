import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
import type { GetEnrollmentStatusInput } from "../schemas/enrollmentSchemas.js";

export async function getEnrollmentStatus(input: GetEnrollmentStatusInput) {
  const result = await query("SELECT * FROM offerings WHERE offering_id = $1", [input.offeringId]);
  const offering = result.rows[0];

  if (!offering) {
    return buildToolResponse("get_enrollment_status", false, `No offering found with ID ${input.offeringId}.`, {
      offeringId: input.offeringId,
      error: "Offering not found. Please verify the offering ID and try again.",
    });
  }

  return buildToolResponse("get_enrollment_status", true, `Enrollment status retrieved for offering ${input.offeringId}.`, {
    offeringId: offering.offering_id,
    courseId: offering.course_id,
    location: offering.location,
    startDate: offering.start_date,
    endDate: offering.end_date,
    status: offering.status,
    capacity: offering.capacity,
    enrolledCount: offering.enrolled_count,
    waitlistCount: offering.waitlist_count,
    seatsRemaining: offering.capacity - offering.enrolled_count,
    isAtCapacity: offering.enrolled_count >= offering.capacity,
    hasWaitlist: offering.waitlist_count > 0,
  }, {
    relatedResource: "learner_enrollment_knowledge",
    nextRecommendedStep: offering.enrolled_count >= offering.capacity
      ? "This offering is at capacity. Consider creating additional offerings or managing the waitlist."
      : undefined,
  });
}
