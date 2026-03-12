/**
 * Server configuration constants for the Learning Advisor MCP Server.
 */
export const SERVER_CONFIG = {
    name: "niit-learning-advisor-mcp",
    version: "1.0.0",
    description: "MCP Server for Learning Advisor AI Avatar — provides tools for dynamic operations and resources for static/policy knowledge across learning management domains.",
};
export const MOCK_DELAY_MS = parseInt(process.env.MOCK_DELAY_MS ?? "150", 10);
export const LOG_LEVEL = (process.env.LOG_LEVEL ?? "info");
/**
 * Logical domain groupings for intent-routing clarity.
 * Each group maps to one or more resources and/or tools.
 */
export const DOMAIN_GROUPS = {
    courseGuidance: {
        label: "Course Guidance & Setup",
        resources: [
            "course_guide_setup_knowledge",
            "course_creation_process_knowledge",
            "course_categories_and_fees_knowledge",
            "course_details_knowledge",
        ],
        tools: ["get_course_fee_info", "get_upcoming_offerings"],
    },
    servicePolicy: {
        label: "Service Policy & Requirements",
        resources: ["service_requirements_knowledge"],
        tools: [],
    },
    hosting: {
        label: "Hosting Services",
        resources: ["hosting_services_knowledge"],
        tools: [],
    },
    printing: {
        label: "Printing Services & Policy",
        resources: [
            "printing_requirements_knowledge",
            "printing_services_knowledge",
        ],
        tools: [],
    },
    workspace: {
        label: "Workspace Management",
        resources: [
            "workspace_creation_knowledge",
            "workspace_access_issue_knowledge",
        ],
        tools: [],
    },
    surveys: {
        label: "Survey Management",
        resources: [
            "survey_management_knowledge",
            "survey_closure_policy_knowledge",
            "express_interest_knowledge",
        ],
        tools: [
            "reopen_survey_window",
            "get_survey_report",
            "amend_survey_closure",
            "get_express_interest_report",
        ],
    },
    offeringManagement: {
        label: "Offering Management & Planning",
        resources: [
            "offering_management_knowledge",
            "planning_and_scheduling_knowledge",
        ],
        tools: [
            "create_offering_request",
            "reschedule_offering",
            "get_upcoming_offerings",
        ],
    },
    enrollments: {
        label: "Learner Enrollment",
        resources: ["learner_enrollment_knowledge"],
        tools: ["get_enrollment_status"],
    },
    billing: {
        label: "Billing & Fee Management",
        resources: ["billing_and_fee_management_knowledge"],
        tools: ["check_course_billing_info", "get_course_fee_info"],
    },
    support: {
        label: "Technical & System Support",
        resources: [
            "system_access_support_knowledge",
            "loi_management_knowledge",
        ],
        tools: ["resolve_technical_access_issue", "process_loi_request"],
    },
    complianceOrCompletion: {
        label: "Attendance, Completion & Compliance",
        resources: [
            "completion_dispute_policy_knowledge",
            "attendance_and_completion_knowledge",
            "aar_sessions_knowledge",
        ],
        tools: ["get_attendance_evidence"],
    },
    logistics: {
        label: "Logistics & Operations",
        resources: [
            "catering_services_knowledge",
            "go_no_go_policy_knowledge",
            "cancellation_policy_knowledge",
        ],
        tools: ["book_training_room", "get_room_bookings"],
    },
    postDelivery: {
        label: "Post-Delivery & Review",
        resources: ["aar_sessions_knowledge"],
        tools: [],
    },
};
