import { z } from "zod";
export const CreateOfferingRequestSchema = z.object({
    courseId: z.string().describe("Course identifier for which a new offering should be created"),
    preferredStartDate: z.string().describe("Preferred start date in ISO format (e.g. '2026-04-14'). This is the first day of the offering."),
    preferredEndDate: z.string().describe("Preferred end date in ISO format (e.g. '2026-04-16'). This is the last day of the offering. Must be on or after preferredStartDate."),
    preferredStartTime: z.string().describe("Preferred daily start time in HH:MM 24-hour format (e.g. '09:00'). The time at which sessions should begin each day."),
    preferredEndTime: z.string().describe("Preferred daily end time in HH:MM 24-hour format (e.g. '17:00'). The time at which sessions should conclude each day."),
    deliveryMode: z.enum(["ILT", "VILT"]).describe("Mode of delivery: 'ILT' for Instructor-Led Training (face-to-face / in-person) or 'VILT' for Virtual Instructor-Led Training (online / virtual)."),
    requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
    locationPreferences: z.array(z.string()).optional().describe("Preferred delivery locations (relevant for ILT; for VILT this can indicate time zone region)"),
    notes: z.string().optional().describe("Additional planning notes or context"),
});
export const RescheduleOfferingSchema = z.object({
    offeringId: z.string().describe("Offering identifier to be rescheduled"),
    newStartDate: z.string().describe("New start date in ISO format"),
    newEndDate: z.string().optional().describe("New end date in ISO format (defaults to single-day if omitted)"),
    newDeliveryMode: z.enum(["ILT", "VILT"]).optional().describe("Optional new delivery mode if changing from ILT to VILT or vice-versa"),
    reason: z.string().min(5).describe("Reason for rescheduling (min 5 characters)"),
    requestedBy: z.string().describe("Name or email of the Learning Advisor making the request"),
});
export const GetUpcomingOfferingsSchema = z.object({
    courseId: z.string().describe("Course identifier to query upcoming offerings for"),
    dateRange: z.object({
        startDate: z.string().describe("Start of date range in ISO format"),
        endDate: z.string().describe("End of date range in ISO format"),
    }).optional().describe("Optional date range filter for offerings"),
});
