import { BookTrainingRoomSchema, GetRoomBookingsSchema } from "../schemas/logisticsSchemas.js";
import { bookTrainingRoom, getRoomBookings } from "../services/logisticsService.js";
import { logger } from "../utils/logger.js";
export function registerLogisticsTools(server) {
    server.tool("book_training_room", `Book a physical training room before offering creation for a face-to-face session.

WHAT IT DOES:
Searches for available rooms at the requested location with sufficient capacity, and creates a booking. Returns the room ID, booking reference, status, and next steps (typically: proceed with offering creation, coordinate catering separately).

WHEN TO USE:
- A Learning Advisor needs a room booking before creating a face-to-face offering.
- A venue needs to be confirmed as part of quarter planning for face-to-face sessions.
- A room needs to be reserved for an ad-hoc or rescheduled session.

WHEN NOT TO USE:
- If the question is about catering for the room/session — use the catering_services_knowledge resource (catering is separate from room booking).
- If the question is about workspace setup (virtual workspace, not physical room) — use workspace_creation_knowledge resource.
- If the question is about virtual hosting setup — use the hosting_services_knowledge resource.
- If the user is asking what rooms are booked or checking existing bookings — use get_room_bookings instead.

INPUT DETAILS:
- location: REQUIRED — physical campus/location name.
- sessionDate: REQUIRED — date in ISO format.
- capacity: REQUIRED — minimum seating needed (positive integer).
- requestedBy: REQUIRED — requesting Learning Advisor.
- courseId: Optional — for context linking.

OUTPUT:
Room ID, booking reference, status, capacity, and next-step guidance.

EXAMPLE PROMPTS:
- "Need room booking for face-to-face session at Singapore Hub"
- "Book a training room for 25 people on April 14 in Singapore"
- "Need a room before creating the offering for CRS-1001"
- "Reserve a venue for the London session next month"`, BookTrainingRoomSchema.shape, async (input) => {
        logger.info("Tool called: book_training_room", input);
        const result = await bookTrainingRoom(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
    server.tool("get_room_bookings", `Query existing room bookings by date and/or location.

WHAT IT DOES:
Looks up all room bookings in the system, optionally filtered by a specific date and/or location. Returns the full booking details for each matching booking including room ID, location, capacity, booking date, who requested it, course ID, booking reference, and status.

WHEN TO USE:
- A user asks what rooms are booked on a specific date (e.g., "What rooms are booked on April 14, 2026?").
- A user wants to check room availability for a location by seeing existing bookings.
- A Learning Advisor wants to review all bookings at a particular campus or hub.
- A user wants to look up a specific booking or verify a booking reference.

WHEN NOT TO USE:
- If the user wants to CREATE a new booking — use book_training_room instead.
- If the question is about catering — use the catering_services_knowledge resource.
- If the question is about virtual hosting — use the hosting_services_knowledge resource.

INPUT DETAILS:
- date: Optional — date in ISO format (YYYY-MM-DD) to filter bookings for a specific day.
- location: Optional — campus/location name (partial match supported, e.g., "Singapore" will match "Singapore Hub").
- At least one of date or location should be provided for meaningful results, but both are optional.

OUTPUT:
List of bookings with room details, booking references, requesters, and course IDs.

EXAMPLE PROMPTS:
- "What rooms are booked on April 14, 2026?"
- "Show me all room bookings at Singapore Hub"
- "Are there any room bookings for London next month?"
- "Which rooms are reserved on 2026-04-14?"
- "Check all bookings at Singapore for April"`, GetRoomBookingsSchema.shape, async (input) => {
        logger.info("Tool called: get_room_bookings", input);
        const result = await getRoomBookings(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
