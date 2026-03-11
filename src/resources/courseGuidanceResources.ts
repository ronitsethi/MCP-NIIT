import type { ResourceContent } from "../types/common.js";

export const courseGuidanceResources: Record<string, ResourceContent> = {
  course_guide_setup_knowledge: {
    title: "Course Guide & Setup Knowledge",
    domain: "courseGuidance",
    overview:
      "This resource provides comprehensive guidance on course-specific information (CI), course guide sections, and setup documentation standards. It helps Learning Advisors understand how to interpret and populate course setup fields, what constitutes course-specific information, and how setup documentation supports downstream operations like hosting, workspace creation, and enrollment.",
    whenThisApplies:
      "Use this resource when a Learning Advisor needs to understand what course-specific information means, how to read or fill a course guide, or what belongs in setup documentation. This is foundational knowledge needed before creating or modifying any course.",
    keyRules: [
      "Every course must have a completed course guide before the first offering can be created.",
      "Course-specific information (CI) includes delivery mode, duration, prerequisites, target audience, assessment method, and any special logistics.",
      "The course guide is the single source of truth for setup. All downstream operations (hosting, workspace, printing, catering) depend on accurate CI.",
      "Setup documentation must be reviewed and approved by the course owner before publication.",
      "Changes to CI mid-cycle require a change request and re-approval from the course owner.",
    ],
    commonMisconceptions: [
      "CI is not the same as the course description — it includes operational and logistical details, not just content summaries.",
      "The course guide is not optional for virtual courses — virtual delivery has its own CI requirements (platform, hosting type, recording policy).",
      "Setup documentation is not a one-time activity — it must be updated whenever course parameters change.",
    ],
    escalationPath:
      "If CI fields are unclear or incomplete, escalate to the course owner. If the course owner is unresponsive, escalate to the DRC (Delivery Resource Coordinator) or Client Executive.",
    requiredInputs: [
      "Course ID or course title",
      "Course owner name or department",
      "Delivery mode (face-to-face, virtual, blended)",
    ],
    relatedTools: ["get_course_fee_info", "get_upcoming_offerings"],
    exampleQuestions: [
      "What is course-specific information?",
      "How should I read the course guide?",
      "What belongs in setup documentation?",
      "What fields are required in the CI section?",
      "Where do I find the course guide template?",
    ],
  },

  course_creation_process_knowledge: {
    title: "Course Creation Process Guide",
    domain: "courseGuidance",
    overview:
      "Step-by-step guidance for creating a new course in the LMS. Covers the template, required fields, approval workflow, and common pitfalls. Designed for new Learning Advisors who need to understand the end-to-end course creation process.",
    whenThisApplies:
      "Use this resource when a new or existing Learning Advisor needs to create a course for the first time, or needs a refresher on the creation process. Also useful when onboarding new team members.",
    keyRules: [
      "Step 1: Obtain the course creation template from the LEM SharePoint repository.",
      "Step 2: Fill in all mandatory fields — course title, course owner, delivery mode, duration, category, target audience, prerequisites, and assessment type.",
      "Step 3: Attach any supplementary materials (facilitator guide, participant workbook references).",
      "Step 4: Submit the completed template via the course creation request workflow in the CRM.",
      "Step 5: The course owner reviews and approves the submission.",
      "Step 6: Upon approval, the LEM team creates the course record in the LMS and configures downstream dependencies (workspace, hosting, survey templates).",
      "Allow 5-7 business days for end-to-end processing from submission to course activation.",
    ],
    commonMisconceptions: [
      "Course creation does not automatically create offerings — offerings must be requested separately.",
      "The template must be fully completed; partial submissions will be returned.",
      "Course creation is not the same as course update — updates use a different workflow.",
    ],
    escalationPath:
      "If the template is unclear, contact the LEM onboarding coordinator. For approval delays, escalate to the course owner's manager.",
    relatedTools: ["create_offering_request"],
    exampleQuestions: [
      "How do I create a new course?",
      "What is the course creation process?",
      "Where is the course creation template?",
      "I'm a new learning advisor — how should I fill the template?",
      "What are the key steps for course creation?",
    ],
  },

  course_categories_and_fees_knowledge: {
    title: "Course Categories & Fee Structure",
    domain: "courseGuidance",
    overview:
      "Explains the course category system (Level-1, Level-2, Level-3, etc.), how categories map to fee structures, and what fees apply for different participant types (internal, external, JVN, OV). Covers external enterprise fees and the rationale behind fee tiers.",
    whenThisApplies:
      "Use this resource when a Learning Advisor asks about fee definitions, category levels, or how fees are calculated. For specific course fee lookups, use the get_course_fee_info tool.",
    keyRules: [
      "Level-1 courses are short-duration, typically 1-2 days, with lower external fees.",
      "Level-2 courses are standard programs, 2-4 days, with moderate fees.",
      "Level-3 courses are intensive programs, 5+ days, with premium fees.",
      "Internal participants do not pay a direct fee but their business unit bears a cost allocation.",
      "External participants pay the full published external fee.",
      "JVN/OV participants pay a discounted rate (typically 50% of external fee) per inter-company agreements.",
      "Fee exceptions require Finance Shared Services approval.",
    ],
    commonMisconceptions: [
      "Internal does not mean free — there is always a cost allocation to the business unit.",
      "JVN and OV are billed differently from external participants — they follow inter-company billing, not direct invoicing.",
      "Fee levels are tied to course category, not to course content difficulty.",
    ],
    relatedTools: ["get_course_fee_info", "check_course_billing_info"],
    exampleQuestions: [
      "What are course categories?",
      "What are the associated fees?",
      "What are external enterprise fees?",
      "How are JVN participants billed?",
      "What is the difference between Level-1 and Level-3 fees?",
    ],
  },

  course_details_knowledge: {
    title: "Course Details & Information Lookup",
    domain: "courseGuidance",
    overview:
      "General guidance on finding and interpreting course details such as duration, delivery mode, prerequisites, target audience, and upcoming schedules. This resource helps Learning Advisors know where to look for course information and what each field means.",
    whenThisApplies:
      "Use this resource when a Learning Advisor needs to understand course attributes or needs guidance on where to find specific course details. For real-time offering schedules and fee data, use the related tools.",
    keyRules: [
      "Course details are stored in the LMS course catalog and mirrored in the CRM.",
      "Key attributes: course ID, title, category, delivery mode, duration, prerequisites, owner, and status.",
      "Offering-level details (dates, location, enrollment count) are separate from course-level details.",
      "Always use the course ID for precise lookups — course titles may have duplicates.",
    ],
    relatedTools: ["get_upcoming_offerings", "get_course_fee_info"],
    exampleQuestions: [
      "What are the details of this course?",
      "Where can I find course prerequisites?",
      "What delivery mode is used for this course?",
      "How long is this course?",
    ],
  },
};
