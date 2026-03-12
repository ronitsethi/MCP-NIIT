import { CreateOfferingRequestSchema, RescheduleOfferingSchema, GetUpcomingOfferingsSchema } from "../schemas/offeringSchemas.js";
import { createOfferingRequest, rescheduleOffering, getUpcomingOfferings } from "../services/offeringService.js";
import { logger } from "../utils/logger.js";
export function registerOfferingTools(server) {
    server.tool("create_offering_request", `Submit a request to create a new future offering for a course.

WHAT IT DOES:
Creates a planning request for a new offering with mandatory scheduling details (start/end dates, start/end times, delivery mode) and optional location and notes. Returns a request ID, proposed next steps, and delivery-mode-specific planning dependencies.

WHEN TO USE:
- No upcoming sessions are available for a course that has demand.
- A Learning Advisor needs to create new offerings for the next quarter.
- The planning team has identified demand (via express interest data) and needs to formalize offering creation.

WHEN NOT TO USE:
- If the question is about how offering creation works or the offering lifecycle — use the offering_management_knowledge resource.
- If the advisor wants to reschedule an existing offering — use reschedule_offering.
- If the advisor just wants to see what offerings exist — use get_upcoming_offerings.

INPUT DETAILS:
- courseId: REQUIRED — the course for which to create a new offering.
- preferredStartDate: REQUIRED — first day of the offering in ISO date format (e.g. '2026-04-14').
- preferredEndDate: REQUIRED — last day of the offering in ISO date format (e.g. '2026-04-16'). Must be on or after preferredStartDate.
- preferredStartTime: REQUIRED — daily session start time in HH:MM 24-hour format (e.g. '09:00').
- preferredEndTime: REQUIRED — daily session end time in HH:MM 24-hour format (e.g. '17:00').
- deliveryMode: REQUIRED — 'ILT' for Instructor-Led Training (face-to-face, in-person) or 'VILT' for Virtual Instructor-Led Training (online, virtual).
- requestedBy: REQUIRED — requesting Learning Advisor.
- locationPreferences: Optional preferred delivery locations (relevant for ILT; for VILT this can indicate time zone region).
- notes: Additional planning context.

OUTPUT:
Request ID, status, delivery-mode-specific planning dependencies (venue/catering for ILT, platform/hosting for VILT), and processing timeline.

BUSINESS ASSUMPTIONS:
- ILT offerings require physical room booking, catering coordination, and printed materials review.
- VILT offerings require virtual platform setup (MS Teams) and hosting type confirmation (Full/Light).
- Planning dependencies differ by delivery mode.

EXAMPLE PROMPTS:
- "Create a new ILT offering for CRS-1001 from April 14–16, 9 AM to 5 PM at Singapore Hub"
- "Need a VILT session for Leadership Essentials on May 5, 10:00 to 14:00"
- "Please create an in-person offering for next month, 3 days, 9 AM to 5 PM"
- "Schedule a virtual offering for CRS-1002, June 9–13, 09:00–17:00"
- "No upcoming sessions — need a face-to-face offering for Project Management"`, CreateOfferingRequestSchema.shape, async (input) => {
        logger.info("Tool called: create_offering_request", input);
        const result = await createOfferingRequest(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
    server.tool("reschedule_offering", `Submit a request to reschedule an existing offering to new dates, or change its delivery mode.

IMPORTANT BEHAVIOR:
Before calling this tool, you MUST explicitly ask the user if they also want to change the modality (to ILT or VILT) as part of the reschedule request. Do not assume the modality remains unchanged without asking.

WHAT IT DOES:
Submits a reschedule request that will trigger coordination with enrolled learners, faculty, and venue contacts. It can also handle transition between Instructor-Led (ILT) and Virtual (VILT) modalities. Returns the old and new schedule, modality impact, impact assessment, and coordination status.

WHEN TO USE:
- An existing offering needs new dates due to faculty unavailability, venue issues, or business needs.
- A Learning Advisor needs to move an offering to different dates, or switch its modality to ILT or VILT.

WHEN NOT TO USE:
- If the offering should be cancelled entirely — that follows the cancellation workflow.
- If the advisor wants to create a new offering (not reschedule existing) — use create_offering_request.
- If the question is about rescheduling policies — use the offering_management_knowledge resource.

INPUT DETAILS:
- offeringId: REQUIRED — the offering to reschedule.
- newStartDate: REQUIRED — new start date in ISO format.
- newEndDate: Optional new end date.
- newDeliveryMode: Optional updated delivery mode ('ILT' or 'VILT').
- reason: REQUIRED — justification (min 5 chars).
- requestedBy: REQUIRED — requesting Learning Advisor.

OUTPUT:
Previous and new dates, modality changes, enrollment impact assessment, coordination status, and stakeholder notification plan.

EXAMPLE PROMPTS:
- "Need to reschedule offering OFF-2001 to May"
- "Please update the dates for the London session"
- "Reschedule this offering — faculty is unavailable on the original dates"
- "Move OFF-2002 from June to July and change it to VILT"`, RescheduleOfferingSchema.shape, async (input) => {
        logger.info("Tool called: reschedule_offering", input);
        const result = await rescheduleOffering(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
    server.tool("get_upcoming_offerings", `Fetch future offerings for a course, including dates, locations, status, and capacity.

WHAT IT DOES:
Returns a list of upcoming offerings for a given course, optionally filtered by date range. Shows dates, locations, offering status, and seat availability.

WHEN TO USE:
- A Learning Advisor asks how many upcoming offerings exist for a course.
- A stakeholder wants to know where and when offerings are planned.
- The advisor needs to check available sessions before enrolling a learner.

WHEN NOT TO USE:
- If the question is about planning requirements or how offerings are created — use the offering_management_knowledge or planning_and_scheduling_knowledge resource.
- If the advisor needs enrollment details (enrolled count, waitlist) for a specific offering — use get_enrollment_status.

INPUT DETAILS:
- courseId: REQUIRED — the course to query.
- dateRange: Optional filter with startDate and endDate in ISO format.

OUTPUT:
List of offerings with: offering ID, start/end date, location, status, capacity, enrolled count, and seats remaining.

EXAMPLE PROMPTS:
- "How many upcoming offerings are there for CRS-1001?"
- "Where are the upcoming sessions planned?"
- "What are the upcoming sessions for Leadership Essentials?"
- "Show me all offerings for CRS-1002 in Q2 2026"
- "Are there any available sessions for this course?"`, GetUpcomingOfferingsSchema.shape, async (input) => {
        logger.info("Tool called: get_upcoming_offerings", input);
        const result = await getUpcomingOfferings(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
