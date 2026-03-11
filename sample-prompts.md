# Sample Prompts for Learning Advisor MCP Server

Use these real-world prompts to test intent routing between resources and tools.

---

## Resource-Only Questions (policy / process / guidance)

| # | Prompt | Expected Artifact |
|---|--------|-------------------|
| 1 | What is course-specific information? | `course_guide_setup_knowledge` |
| 2 | How should I read the course guide? | `course_guide_setup_knowledge` |
| 3 | What do LEM services required mean? | `service_requirements_knowledge` |
| 4 | What is the difference between full hosting and light hosting? | `hosting_services_knowledge` |
| 5 | Why do we need approval for printing? | `printing_requirements_knowledge` |
| 6 | Do you provide printing services for face-to-face courses? | `printing_services_knowledge` |
| 7 | Why is workspace master mandatory? | `workspace_creation_knowledge` |
| 8 | How does express interest work? | `express_interest_knowledge` |
| 9 | What are the planning requirements for upcoming offerings? | `planning_and_scheduling_knowledge` |
| 10 | What are course categories and associated fees? | `course_categories_and_fees_knowledge` |
| 11 | What are the catering requirements? | `catering_services_knowledge` |
| 12 | Why are go/no-go decisions happening late? | `go_no_go_policy_knowledge` |
| 13 | Can survey closure dates be amended? | `survey_closure_policy_knowledge` |
| 14 | How are completion disputes handled? | `completion_dispute_policy_knowledge` |
| 15 | NOV and JV learners can access workspace but not content — what's the workaround? | `workspace_access_issue_knowledge` |
| 16 | New learning advisor needs help with course creation process | `course_creation_process_knowledge` |
| 17 | If a learner cancels after deadline, do charges still apply? | `cancellation_policy_knowledge` |
| 18 | What happens in after-action review sessions? | `aar_sessions_knowledge` |
| 19 | How is attendance tracked? | `attendance_and_completion_knowledge` |

---

## Tool-Only Questions (data lookup / transactional)

| # | Prompt | Expected Tool |
|---|--------|---------------|
| 1 | Survey link is not accessible, can it be reopened until next week? | `reopen_survey_window` |
| 2 | How many participants completed the survey? | `get_survey_report` |
| 3 | Can you share the latest survey report? | `get_survey_report` |
| 4 | Please amend the survey closure date | `amend_survey_closure` |
| 5 | Can we get the express interest list? | `get_express_interest_report` |
| 6 | Learner cannot access Moodle | `resolve_technical_access_issue` |
| 7 | Learner cannot access SharePoint / MS Teams | `resolve_technical_access_issue` |
| 8 | LOI is not saving and draft is not generating | `process_loi_request` |
| 9 | Please create new offerings for next quarter | `create_offering_request` |
| 10 | Please reschedule this offering | `reschedule_offering` |
| 11 | How many upcoming offerings exist for this course? | `get_upcoming_offerings` |
| 12 | How many learners are enrolled in this offering? | `get_enrollment_status` |
| 13 | Who gets billed for JVN/OV participants? | `check_course_billing_info` |
| 14 | What are the fees for this course? | `get_course_fee_info` |
| 15 | Learner disputes completion status — fetch attendance evidence | `get_attendance_evidence` |
| 16 | Need room booking before creating an offering | `book_training_room` |

---

## Both (Resource + Tool) Questions

| # | Prompt | Resource to Read | Tool to Call |
|---|--------|-----------------|-------------|
| 1 | Survey link is not accessible — how does the survey process work and can you reopen it? | `survey_management_knowledge` | `reopen_survey_window` |
| 2 | How does express interest work, and can you pull the interest list? | `express_interest_knowledge` | `get_express_interest_report` |
| 3 | What are the billing policies, and who gets billed for JVN participants in CRS-1001? | `billing_and_fee_management_knowledge` | `check_course_billing_info` |
| 4 | How are completion disputes handled? Can you fetch attendance evidence for learner USR-3002? | `completion_dispute_policy_knowledge` | `get_attendance_evidence` |
| 5 | How does the LOI process work? The LOI is not saving for this learner. | `loi_management_knowledge` | `process_loi_request` |
| 6 | What are the hosting options and what are the planning requirements? Please also create offerings for next quarter. | `hosting_services_knowledge` + `planning_and_scheduling_knowledge` | `create_offering_request` |
