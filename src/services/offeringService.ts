import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import { MOCK_OFFERINGS } from "../data/mockData.js";
import type { CreateOfferingRequestInput, RescheduleOfferingInput, GetUpcomingOfferingsInput } from "../schemas/offeringSchemas.js";

export async function createOfferingRequest(input: CreateOfferingRequestInput) {
  await mockDelay();

  const modeSpecificDeps = input.deliveryMode === "ILT"
    ? [
        "Room/venue availability check pending",
        "Catering requirements to be confirmed",
        "Printed materials check (if applicable)",
      ]
    : [
        "Virtual platform (MS Teams) session setup pending",
        "Hosting type (Full/Light) to be confirmed with course owner",
      ];

  return buildToolResponse("create_offering_request", true, "New offering creation request has been submitted.", {
    courseId: input.courseId,
    deliveryMode: input.deliveryMode,
    preferredStartDate: input.preferredStartDate,
    preferredEndDate: input.preferredEndDate,
    preferredStartTime: input.preferredStartTime,
    preferredEndTime: input.preferredEndTime,
    locationPreferences: input.locationPreferences ?? (input.deliveryMode === "VILT" ? ["Virtual"] : ["To be determined"]),
    requestedBy: input.requestedBy,
    notes: input.notes ?? null,
    requestId: `OREQ-${Date.now().toString(36).toUpperCase()}`,
    requestStatus: "submitted",
    planningDependencies: [
      "Faculty availability confirmation required",
      ...modeSpecificDeps,
      "Go/no-go decision pending based on minimum enrollment threshold",
      "Workspace setup will be triggered after confirmation",
    ],
    estimatedProcessingTime: "3-5 business days",
  }, {
    nextRecommendedStep: input.deliveryMode === "ILT"
      ? "Track the request status. Book a training room (if not already done) and coordinate catering separately."
      : "Track the request status. Confirm hosting type (Full/Light) with the course owner.",
    relatedResource: "offering_management_knowledge",
  });
}

export async function rescheduleOffering(input: RescheduleOfferingInput) {
  await mockDelay();
  const existing = MOCK_OFFERINGS.find((o) => o.offeringId === input.offeringId);
  return buildToolResponse("reschedule_offering", true, "Offering reschedule request has been submitted.", {
    offeringId: input.offeringId,
    previousStartDate: existing?.startDate ?? "unknown",
    previousEndDate: existing?.endDate ?? "unknown",
    newStartDate: input.newStartDate,
    newEndDate: input.newEndDate ?? input.newStartDate,
    reason: input.reason,
    requestedBy: input.requestedBy,
    rescheduleStatus: "pending_coordination",
    stakeholderCoordination: "All enrolled learners, faculty, and venue contacts will be notified once the reschedule is confirmed.",
    impactAssessment: existing
      ? `${existing.enrolledCount} learners currently enrolled; ${existing.waitlistCount} on waitlist. All will be notified.`
      : "Unable to retrieve current enrollment data for impact assessment.",
  }, {
    nextRecommendedStep: "Monitor the coordination status. Faculty and venue confirmation are prerequisites for finalizing the new dates.",
    relatedResource: "offering_management_knowledge",
  });
}

export async function getUpcomingOfferings(input: GetUpcomingOfferingsInput) {
  await mockDelay();
  let offerings = MOCK_OFFERINGS.filter((o) => o.courseId === input.courseId);
  if (input.dateRange) {
    offerings = offerings.filter(
      (o) => o.startDate >= input.dateRange!.startDate && o.startDate <= input.dateRange!.endDate
    );
  }
  return buildToolResponse("get_upcoming_offerings", true, `Found ${offerings.length} upcoming offering(s) for course ${input.courseId}.`, {
    courseId: input.courseId,
    totalOfferings: offerings.length,
    offerings: offerings.map((o) => ({
      offeringId: o.offeringId,
      startDate: o.startDate,
      endDate: o.endDate,
      location: o.location,
      status: o.status,
      capacity: o.capacity,
      enrolledCount: o.enrolledCount,
      seatsRemaining: o.capacity - o.enrolledCount,
    })),
    dateRange: input.dateRange ?? null,
  }, {
    relatedResource: "offering_management_knowledge",
  });
}
