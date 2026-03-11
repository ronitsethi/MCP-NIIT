# NIIT Learning Advisor MCP Server

A **Model Context Protocol (MCP)** server built for the **Learning Advisor AI Avatar** system.  
It provides **MCP Tools** (dynamic operations) and **MCP Resources** (static knowledge) that power a Learning Advisor's day-to-day question workflows — from course setup and enrollment to surveys, billing, and technical support.

---

## Why Both Tools AND Resources?

| Layer | Purpose | Examples |
|-------|---------|---------|
| **Resources** | Static/semi-static knowledge that a Learning Advisor needs to understand policies, SOPs, definitions, templates, SLAs | "What is full hosting vs light hosting?", "How does express interest work?" |
| **Tools** | Dynamic operations that require real-time data lookup, status checks, or transactional actions | "How many learners are enrolled?", "Reopen the survey window until Friday" |

FlowiseAI (the orchestration layer) uses tool/resource **descriptions** to decide whether to answer directly, read a resource, call a tool, or do both.

---

## Question → MCP Artifact Mapping

| Question Cluster | MCP Artifact Type | Artifact Names |
|---|---|---|
| Course guide / setup / creation | Resource | `course_guide_setup_knowledge`, `course_creation_process_knowledge`, `course_details_knowledge` |
| Course categories & fees | Both | Resource: `course_categories_and_fees_knowledge` · Tools: `get_course_fee_info` |
| Service requirements | Resource | `service_requirements_knowledge` |
| Hosting models | Resource | `hosting_services_knowledge` |
| Printing policy & services | Resource | `printing_requirements_knowledge`, `printing_services_knowledge` |
| Workspace creation & access | Resource | `workspace_creation_knowledge`, `workspace_access_issue_knowledge` |
| Survey management | Both | Resources: `survey_management_knowledge`, `survey_closure_policy_knowledge` · Tools: `reopen_survey_window`, `get_survey_report`, `amend_survey_closure` |
| Express interest | Both | Resource: `express_interest_knowledge` · Tool: `get_express_interest_report` |
| Offering management & planning | Both | Resources: `offering_management_knowledge`, `planning_and_scheduling_knowledge` · Tools: `create_offering_request`, `reschedule_offering`, `get_upcoming_offerings` |
| Learner enrollment | Both | Resource: `learner_enrollment_knowledge` · Tool: `get_enrollment_status` |
| Billing & fees | Both | Resource: `billing_and_fee_management_knowledge` · Tools: `check_course_billing_info`, `get_course_fee_info` |
| System access / support | Both | Resource: `system_access_support_knowledge` · Tool: `resolve_technical_access_issue` |
| LOI management | Both | Resource: `loi_management_knowledge` · Tool: `process_loi_request` |
| Completion & attendance | Both | Resources: `completion_dispute_policy_knowledge`, `attendance_and_completion_knowledge` · Tool: `get_attendance_evidence` |
| AAR sessions | Resource | `aar_sessions_knowledge` |
| Catering | Resource | `catering_services_knowledge` |
| Go/no-go policy | Resource | `go_no_go_policy_knowledge` |
| Cancellation policy | Resource | `cancellation_policy_knowledge` |
| Room booking | Tool | `book_training_room` |

---

## Project Structure

```
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── mcp_config.example.json
├── sample-prompts.md
├── README.md
└── src/
    ├── index.ts              ← STDIO entry point
    ├── server.ts             ← MCP server assembly (registers all tools + resources)
    ├── config.ts             ← Constants, domain groupings
    ├── types/
    │   └── common.ts         ← Shared TypeScript types
    ├── utils/
    │   ├── logger.ts         ← Console logger (writes to stderr)
    │   ├── response.ts       ← Standardized tool response builder
    │   └── mockDelay.ts      ← Simulated backend latency
    ├── data/
    │   └── mockData.ts       ← Mock courses, offerings, learners, etc.
    ├── schemas/              ← Zod schemas (one per tool domain)
    │   ├── surveySchemas.ts
    │   ├── supportSchemas.ts
    │   ├── loiSchemas.ts
    │   ├── offeringSchemas.ts
    │   ├── enrollmentSchemas.ts
    │   ├── billingSchemas.ts
    │   ├── attendanceSchemas.ts
    │   ├── logisticsSchemas.ts
    │   └── courseSchemas.ts
    ├── services/             ← Mock service layer (replace with real APIs)
    │   ├── surveyService.ts
    │   ├── supportService.ts
    │   ├── loiService.ts
    │   ├── offeringService.ts
    │   ├── enrollmentService.ts
    │   ├── billingService.ts
    │   ├── attendanceService.ts
    │   ├── logisticsService.ts
    │   └── courseService.ts
    ├── resources/            ← MCP resource definitions (structured knowledge)
    │   ├── courseGuidanceResources.ts
    │   ├── servicePolicyResources.ts
    │   ├── hostingResources.ts
    │   ├── printingResources.ts
    │   ├── workspaceResources.ts
    │   ├── surveyResources.ts
    │   ├── offeringResources.ts
    │   ├── enrollmentResources.ts
    │   ├── billingResources.ts
    │   ├── supportResources.ts
    │   ├── completionResources.ts
    │   └── logisticsResources.ts
    └── tools/                ← MCP tool definitions (handler + description)
        ├── surveyTools.ts
        ├── supportTools.ts
        ├── loiTools.ts
        ├── offeringTools.ts
        ├── enrollmentTools.ts
        ├── billingTools.ts
        ├── attendanceTools.ts
        ├── logisticsTools.ts
        └── courseTools.ts
```

---

## Install

```bash
npm install
```

---

## Run (Development)

```bash
npm run dev
```

This starts the server using `tsx` (TypeScript executor) and listens on **STDIO** for MCP client messages.

---

## Build (Production)

```bash
npm run build
```

Output goes to `dist/`. Run the built server with:

```bash
npm start
# or
node dist/index.js
```

---

## TypeScript Check

```bash
npm run typecheck
```

---

## Local Testing with Antigravity

1. Build the project:
   ```bash
   npm run build
   ```

2. Add the following to your Antigravity MCP configuration (see `mcp_config.example.json`):
   ```json
   {
     "mcpServers": {
       "niit-learning-advisor": {
         "command": "node",
         "args": ["/Users/ronitsethi/Documents/Antigravity/Niit/MCP NIIT/dist/index.js"],
         "transportType": "stdio"
       }
     }
   }
   ```

3. Restart Antigravity — the server should appear with all tools and resources listed.

---

## Replacing Mocks with Real Integrations

All business logic lives in `src/services/`. Each service file exports functions that currently return mock data.

**To integrate with real backends:**

1. Replace the function body in the relevant service file.
2. Replace `mockDelay()` with actual API/database calls.
3. Keep the same return type (`ToolResponse<T>`) — this ensures the tool layer doesn't need changes.
4. Add real credentials to `.env` (see `.env.example` for placeholders).
5. Update `src/config.ts` if you need new configuration constants.

**No changes needed in:**
- `src/tools/` — tool definitions stay the same
- `src/schemas/` — input validation stays the same
- `src/resources/` — unless policy content changes
- `src/server.ts` — server assembly stays the same

---

## How FlowiseAI Should Use This Server

1. **Tool descriptions** tell FlowiseAI WHEN to call a tool, WHEN NOT TO, and provide example prompts.
2. **Resource descriptions** tell FlowiseAI what knowledge is available and when it should be read instead of calling a tool.
3. The orchestration should:
   - Read a resource when the user asks an explanatory/policy question.
   - Call a tool when the user wants real-time data or transactional action.
   - Do both when the user needs policy context AND dynamic data.

---

## License

Proprietary — NIIT internal use.
