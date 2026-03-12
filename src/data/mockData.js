/**
 * Shared mock data used by service layers.
 * Replace with real database/API queries when integrating.
 */
export const MOCK_COURSES = [
    {
        courseId: "CRS-1001",
        title: "Leadership Essentials",
        category: "Level-2",
        deliveryMode: "face-to-face",
        durationDays: 3,
        owner: "Global Talent Development",
        fees: { internal: 0, external: 1500, jvn: 750 },
    },
    {
        courseId: "CRS-1002",
        title: "Project Management Foundations",
        category: "Level-3",
        deliveryMode: "blended",
        durationDays: 5,
        owner: "Academy of PM",
        fees: { internal: 0, external: 2200, jvn: 1100 },
    },
    {
        courseId: "CRS-1003",
        title: "Data Analytics for Business",
        category: "Level-1",
        deliveryMode: "virtual",
        durationDays: 2,
        owner: "Digital Learning Group",
        fees: { internal: 0, external: 800, jvn: 400 },
    },
];
export const MOCK_OFFERINGS = [
    {
        offeringId: "OFF-2001",
        courseId: "CRS-1001",
        startDate: "2026-04-14",
        endDate: "2026-04-16",
        location: "Singapore Hub",
        status: "confirmed",
        capacity: 25,
        enrolledCount: 18,
        waitlistCount: 3,
    },
    {
        offeringId: "OFF-2002",
        courseId: "CRS-1001",
        startDate: "2026-06-09",
        endDate: "2026-06-11",
        location: "London Office",
        status: "planning",
        capacity: 20,
        enrolledCount: 5,
        waitlistCount: 0,
    },
    {
        offeringId: "OFF-2003",
        courseId: "CRS-1002",
        startDate: "2026-05-05",
        endDate: "2026-05-09",
        location: "Virtual (MS Teams)",
        status: "confirmed",
        capacity: 40,
        enrolledCount: 32,
        waitlistCount: 7,
    },
];
export const MOCK_LEARNERS = [
    { userId: "USR-3001", name: "Priya Kapoor", type: "internal" },
    { userId: "USR-3002", name: "James Morton", type: "external" },
    { userId: "USR-3003", name: "Yuki Tanaka", type: "jvn" },
];
export const MOCK_SURVEY_DATA = {
    offeringId: "OFF-2001",
    totalParticipants: 18,
    responsesReceived: 12,
    responseRate: 66.7,
    surveyCloseDate: "2026-05-01",
    averageRating: 4.3,
    reportUrl: "https://surveys.example.com/reports/OFF-2001-summary.pdf",
};
export const MOCK_ATTENDANCE = [
    {
        userId: "USR-3001",
        offeringId: "OFF-2001",
        sessionsAttended: 3,
        totalSessions: 3,
        status: "pass",
        evidenceLinks: [
            "https://lms.example.com/attendance/OFF-2001/USR-3001",
            "https://lms.example.com/sign-in-sheet/OFF-2001-day1.pdf",
        ],
    },
    {
        userId: "USR-3002",
        offeringId: "OFF-2001",
        sessionsAttended: 2,
        totalSessions: 3,
        status: "fail",
        evidenceLinks: [
            "https://lms.example.com/attendance/OFF-2001/USR-3002",
        ],
    },
];
export const MOCK_ROOMS = [
    { roomId: "RM-501", location: "Singapore Hub", capacity: 30 },
    { roomId: "RM-502", location: "London Office", capacity: 20 },
    { roomId: "RM-503", location: "New York Center", capacity: 25 },
];
export const MOCK_BOOKINGS = [
    {
        bookingId: "BKG-001",
        roomId: "RM-501",
        bookingDate: "2026-04-14",
        requestedBy: "Priya Kapoor",
        courseId: "CRS-1001",
        bookingReference: "BK-MMMJYKR0",
        status: "confirmed",
    },
    {
        bookingId: "BKG-002",
        roomId: "RM-503",
        bookingDate: "2026-04-14",
        requestedBy: "James Morton",
        courseId: "CRS-1002",
        bookingReference: "BK-N7X2PLQ1",
        status: "confirmed",
    },
    {
        bookingId: "BKG-003",
        roomId: "RM-502",
        bookingDate: "2026-06-09",
        requestedBy: "Yuki Tanaka",
        courseId: "CRS-1001",
        bookingReference: "BK-R3KFWM42",
        status: "confirmed",
    },
];
