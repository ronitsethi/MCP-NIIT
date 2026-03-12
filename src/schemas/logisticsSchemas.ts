import { z } from "zod";

export const BookTrainingRoomSchema = z.object({
  location: z.string().describe("Physical location/campus where the room is needed"),
  sessionDate: z.string().describe("Date of the session in ISO format"),
  capacity: z.number().int().positive().describe("Minimum seating capacity required (must be a positive integer)"),
  requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
  courseId: z.string().optional().describe("Related course identifier for context"),
});

export const GetRoomBookingsSchema = z.object({
  date: z.string().optional().describe("Filter bookings by date in ISO format (YYYY-MM-DD). If omitted, all dates are returned."),
  location: z.string().optional().describe("Filter bookings by location/campus name (partial match supported). If omitted, all locations are returned."),
});

export type BookTrainingRoomInput = z.infer<typeof BookTrainingRoomSchema>;
export type GetRoomBookingsInput = z.infer<typeof GetRoomBookingsSchema>;
