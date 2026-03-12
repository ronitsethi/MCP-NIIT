import { buildToolResponse } from "../utils/response.js";
import { query } from "../db.js";
import type { BookTrainingRoomInput, GetRoomBookingsInput } from "../schemas/logisticsSchemas.js";

export async function bookTrainingRoom(input: BookTrainingRoomInput) {
  const result = await query(
    `SELECT r.* 
     FROM rooms r
     WHERE LOWER(r.location) LIKE $1 
       AND r.capacity >= $2
       AND NOT EXISTS (
         SELECT 1 FROM bookings b 
         WHERE b.room_id = r.room_id 
           AND b.booking_date::date = $3::date
           AND b.status = 'confirmed'
       )
     LIMIT 1`,
    [`%${input.location.toLowerCase()}%`, input.capacity, input.sessionDate]
  );
  const matchingRoom = result.rows[0];

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

  // Generate booking reference and persist the booking
  const bookingReference = `BK-${Date.now().toString(36).toUpperCase()}`;
  const bookingId = `BKG-${Date.now().toString(36).toUpperCase()}`;

  await query(
    `INSERT INTO bookings (booking_id, room_id, booking_date, requested_by, course_id, booking_reference, status)
     VALUES ($1, $2, $3::date, $4, $5, $6, 'confirmed')`,
    [bookingId, matchingRoom.room_id, input.sessionDate, input.requestedBy, input.courseId ?? null, bookingReference]
  );

  return buildToolResponse("book_training_room", true, `Room ${matchingRoom.room_id} booked successfully at ${matchingRoom.location}.`, {
    roomId: matchingRoom.room_id,
    location: matchingRoom.location,
    roomCapacity: matchingRoom.capacity,
    sessionDate: input.sessionDate,
    requestedBy: input.requestedBy,
    courseId: input.courseId ?? null,
    bookingStatus: "confirmed",
    bookingReference,
    notes: "Room booking is confirmed. Ensure AV equipment and catering requirements are coordinated separately if needed.",
  }, {
    nextRecommendedStep: "Proceed with offering creation now that the venue is confirmed. Coordinate catering and AV requirements separately.",
    relatedResource: "catering_services_knowledge",
  });
}

export async function getRoomBookings(input: GetRoomBookingsInput) {
  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (input.date) {
    conditions.push(`b.booking_date::date = $${paramIndex}::date`);
    params.push(input.date);
    paramIndex++;
  }

  if (input.location) {
    conditions.push(`LOWER(r.location) LIKE $${paramIndex}`);
    params.push(`%${input.location.toLowerCase()}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await query(
    `SELECT b.booking_id, b.room_id, r.location, r.capacity, 
            TO_CHAR(b.booking_date, 'YYYY-MM-DD') as booking_date_str, 
            b.requested_by, b.course_id, b.booking_reference, b.status, b.created_at
     FROM bookings b
     JOIN rooms r ON b.room_id = r.room_id
     ${whereClause}
     ORDER BY b.booking_date, r.location`,
    params
  );

  const bookings = result.rows.map((row) => ({
    bookingId: row.booking_id,
    roomId: row.room_id,
    location: row.location,
    roomCapacity: row.capacity,
    bookingDate: row.booking_date_str,
    requestedBy: row.requested_by,
    courseId: row.course_id,
    bookingReference: row.booking_reference,
    status: row.status,
  }));

  if (bookings.length === 0) {
    const filterDesc = [
      input.date ? `date ${input.date}` : null,
      input.location ? `location "${input.location}"` : null,
    ].filter(Boolean).join(" and ");

    return buildToolResponse("get_room_bookings", true, `No room bookings found for ${filterDesc}.`, {
      filters: { date: input.date ?? null, location: input.location ?? null },
      totalBookings: 0,
      bookings: [],
    }, {
      nextRecommendedStep: "If a room booking is needed, use the book_training_room tool to reserve one.",
      relatedResource: "catering_services_knowledge",
    });
  }

  const filterDesc = [
    input.date ? `date ${input.date}` : null,
    input.location ? `location "${input.location}"` : null,
  ].filter(Boolean).join(" and ");

  return buildToolResponse("get_room_bookings", true, `Found ${bookings.length} booking(s)${filterDesc ? ` for ${filterDesc}` : ""}.`, {
    filters: { date: input.date ?? null, location: input.location ?? null },
    totalBookings: bookings.length,
    bookings,
  }, {
    nextRecommendedStep: "Review booking details. Use book_training_room if additional rooms are needed, or coordinate catering separately.",
  });
}
