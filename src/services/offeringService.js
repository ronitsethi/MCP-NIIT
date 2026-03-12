import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
export async function createOfferingRequest(input) {
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
export async function rescheduleOffering(input) {
    const result = await query("SELECT * FROM offerings WHERE offering_id = $1", [input.offeringId]);
    const existing = result.rows[0];
    return buildToolResponse("reschedule_offering", true, "Offering reschedule request has been submitted.", {
        offeringId: input.offeringId,
        previousStartDate: existing?.start_date ?? "unknown",
        previousEndDate: existing?.end_date ?? "unknown",
        newStartDate: input.newStartDate,
        newEndDate: input.newEndDate ?? input.newStartDate,
        newDeliveryMode: input.newDeliveryMode ?? existing?.delivery_mode ?? "unchanged",
        reason: input.reason,
        requestedBy: input.requestedBy,
        rescheduleStatus: "pending_coordination",
        stakeholderCoordination: "All enrolled learners, faculty, and venue contacts will be notified once the reschedule is confirmed.",
        impactAssessment: existing
            ? `${existing.enrolled_count} learners currently enrolled; ${existing.waitlist_count} on waitlist. All will be notified.`
            : "Unable to retrieve current enrollment data for impact assessment.",
    }, {
        nextRecommendedStep: input.newDeliveryMode
            ? "Monitor the coordination status. Modality change requires confirming new venue or virtual platform. Faculty and venue confirmation are prerequisites."
            : "Monitor the coordination status. Faculty and venue confirmation are prerequisites for finalizing the new dates.",
        relatedResource: "offering_management_knowledge",
    });
}
export async function getUpcomingOfferings(input) {
    let sql = "SELECT * FROM offerings WHERE course_id = $1";
    const params = [input.courseId];
    if (input.dateRange) {
        sql += " AND start_date >= $2 AND start_date <= $3";
        params.push(input.dateRange.startDate, input.dateRange.endDate);
    }
    const result = await query(sql, params);
    const offerings = result.rows;
    return buildToolResponse("get_upcoming_offerings", true, `Found ${offerings.length} upcoming offering(s) for course ${input.courseId}.`, {
        courseId: input.courseId,
        totalOfferings: offerings.length,
        offerings: offerings.map((o) => ({
            offeringId: o.offering_id,
            startDate: o.start_date,
            endDate: o.end_date,
            location: o.location,
            status: o.status,
            capacity: o.capacity,
            enrolledCount: o.enrolled_count,
            seatsRemaining: o.capacity - o.enrolled_count,
        })),
        dateRange: input.dateRange ?? null,
    }, {
        relatedResource: "offering_management_knowledge",
    });
}
