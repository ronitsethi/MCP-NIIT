import { mockDelay } from "../utils/mockDelay.js";
import { buildToolResponse } from "../utils/response.js";
import { MOCK_ROOMS } from "../data/mockData.js";
import type { BookTrainingRoomInput } from "../schemas/logisticsSchemas.js";

export async function bookTrainingRoom(input: BookTrainingRoomInput) {
  await mockDelay();

  const matchingRoom = MOCK_ROOMS.find(
    (r) => r.location.toLowerCase().includes(input.location.toLowerCase()) && r.capacity >= input.capacity && r.status === "available"
  );

  if (!matchingRoom) {
    return buildToolResponse("book_training_room", false, `No available room found at "${input.location}" with capacity ≥ ${input.capacity}.`, {
      location: input.location,
      requestedCapacity: input.capacity,
      sessionDate: input.sessionDate,
      suggestion: "Try an alternative location or adjust the capacity requirement. Contact Facilities Management for overflow options.",
    }, {
      nextRecommendedStep: "Check alternative locations or contact Facilities Management directly for ad-hoc room arrangements.",
    });
  }

  return buildToolResponse("book_training_room", true, `Room ${matchingRoom.roomId} booked successfully at ${matchingRoom.location}.`, {
    roomId: matchingRoom.roomId,
    location: matchingRoom.location,
    roomCapacity: matchingRoom.capacity,
    sessionDate: input.sessionDate,
    requestedBy: input.requestedBy,
    courseId: input.courseId ?? null,
    bookingStatus: "confirmed",
    bookingReference: `BK-${Date.now().toString(36).toUpperCase()}`,
    notes: "Room booking is confirmed. Ensure AV equipment and catering requirements are coordinated separately if needed.",
  }, {
    nextRecommendedStep: "Proceed with offering creation now that the venue is confirmed. Coordinate catering and AV requirements separately.",
    relatedResource: "catering_services_knowledge",
  });
}
