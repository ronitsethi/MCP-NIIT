import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BookTrainingRoomSchema } from "../schemas/logisticsSchemas.js";
import { bookTrainingRoom } from "../services/logisticsService.js";
import { logger } from "../utils/logger.js";

export function registerLogisticsTools(server: McpServer) {
  server.tool(
    "book_training_room",
    `Book a physical training room before offering creation for a face-to-face session.

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
- "Reserve a venue for the London session next month"`,
    BookTrainingRoomSchema.shape,
    async (input) => {
      logger.info("Tool called: book_training_room", input);
      const result = await bookTrainingRoom(input);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
