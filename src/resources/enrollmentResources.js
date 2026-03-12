export const enrollmentResources = {
    learner_enrollment_knowledge: {
        title: "Learner Enrollment Management",
        domain: "enrollments",
        overview: "Explains how enrollment works, the enrollment lifecycle, capacity management, waitlist handling, and the relationship between enrollment, offering status, and completion tracking.",
        whenThisApplies: "Use this resource when a Learning Advisor asks about enrollment processes, capacity rules, or waitlist management. For real-time enrollment data, use the get_enrollment_status tool.",
        keyRules: [
            "Enrollment is open once an offering reaches 'confirmed' status.",
            "Enrollment is managed on a first-come, first-served basis unless the course owner specifies priority rules.",
            "When capacity is reached, additional enrollments go to the waitlist automatically.",
            "Waitlisted learners are promoted in order when a seat becomes available (e.g., due to cancellation).",
            "Enrollment closes 3 business days before the offering start date for face-to-face, and 1 business day for virtual.",
            "Late enrollment exceptions require course owner approval.",
            "Enrollment does not guarantee completion — completion is determined by attendance and assessment results.",
        ],
        commonMisconceptions: [
            "Enrollment is not the same as registration — enrollment means the learner has a confirmed seat.",
            "Waitlist position does not guarantee eventual enrollment — it depends on cancellations.",
            "Closing enrollment does not cancel the offering — the offering proceeds with the current enrollment.",
        ],
        escalationPath: "For enrollment system issues, contact the LMS admin team. For capacity increase requests, contact the course owner and venue coordinator.",
        relatedTools: ["get_enrollment_status"],
        exampleQuestions: [
            "How does enrollment work?",
            "How many learners are enrolled?",
            "What is the current enrollment status?",
            "Is there a waitlist?",
            "When does enrollment close?",
        ],
    },
};
