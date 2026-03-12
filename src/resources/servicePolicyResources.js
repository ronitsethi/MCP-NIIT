export const servicePolicyResources = {
    service_requirements_knowledge: {
        title: "LEM Service Requirements & Scope",
        domain: "servicePolicy",
        overview: "Explains what 'LEM services required' means, the scope of end-to-end LEM management, and the boundary between activities handled by the LEM team versus those owned by the client or course owner. Covers service activities that should be captured during course setup to avoid scope confusion later.",
        whenThisApplies: "Use this resource when a Learning Advisor asks what LEM services include, what falls outside LEM scope, or what activities should be documented during course setup to define the service boundary.",
        keyRules: [
            "LEM end-to-end services include: course setup, offering management, enrollment management, logistics coordination, communications, post-delivery administration (surveys, completion, LOI).",
            "LEM does NOT include: course content creation/updates, faculty recruitment, budget owner approvals, strategic learning design.",
            "Service requirements must be agreed upon during course setup and documented in the course guide CI section.",
            "If a new activity is requested mid-cycle that was not in the original service agreement, it must go through a scope change request.",
            "The service scope defines what the Learning Advisor can request from the LEM team without additional approval.",
        ],
        commonMisconceptions: [
            "LEM services required does not mean LEM handles everything — the course owner retains responsibility for content, faculty, and go/no-go decisions.",
            "Service requirements are not the same as system requirements — service = what activities, system = which platforms.",
            "The scope does not automatically expand for new offerings of the same course — each offering inherits the course-level scope unless changed.",
        ],
        escalationPath: "If there is a disagreement about service scope, escalate to the DRC or Client Executive for a scope review meeting.",
        requiredInputs: [
            "Course ID or course title",
            "Nature of the service question (scope check, new activity request, boundary clarification)",
        ],
        relatedTools: [],
        exampleQuestions: [
            "What do LEM services required mean?",
            "What is included in end-to-end LEM management?",
            "What activities are covered under service requirements?",
            "What is outside LEM scope?",
            "How do I define the service scope for a new course?",
        ],
    },
};
