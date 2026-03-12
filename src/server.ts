/**
 * MCP Server assembly — registers all tools and resources.
 */

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVER_CONFIG } from "./config.js";
import { logger } from "./utils/logger.js";

// Resource imports
import { courseGuidanceResources } from "./resources/courseGuidanceResources.js";
import { servicePolicyResources } from "./resources/servicePolicyResources.js";
import { hostingResources } from "./resources/hostingResources.js";
import { printingResources } from "./resources/printingResources.js";
import { workspaceResources } from "./resources/workspaceResources.js";
import { surveyResources } from "./resources/surveyResources.js";
import { offeringResources } from "./resources/offeringResources.js";
import { enrollmentResources } from "./resources/enrollmentResources.js";
import { billingResources } from "./resources/billingResources.js";
import { supportResources } from "./resources/supportResources.js";
import { completionResources } from "./resources/completionResources.js";
import { logisticsResources } from "./resources/logisticsResources.js";

// Tool registration imports
import { registerSurveyTools } from "./tools/surveyTools.js";
import { registerSupportTools } from "./tools/supportTools.js";
import { registerLoiTools } from "./tools/loiTools.js";
import { registerOfferingTools } from "./tools/offeringTools.js";
import { registerEnrollmentTools } from "./tools/enrollmentTools.js";
import { registerBillingTools } from "./tools/billingTools.js";
import { registerAttendanceTools } from "./tools/attendanceTools.js";
import { registerLogisticsTools } from "./tools/logisticsTools.js";
import { registerCourseTools } from "./tools/courseTools.js";

import type { ResourceContent } from "./types/common.js";

/**
 * Aggregate all resource content maps into a single registry.
 */
const ALL_RESOURCES: Record<string, ResourceContent> = {
  ...courseGuidanceResources,
  ...servicePolicyResources,
  ...hostingResources,
  ...printingResources,
  ...workspaceResources,
  ...surveyResources,
  ...offeringResources,
  ...enrollmentResources,
  ...billingResources,
  ...supportResources,
  ...completionResources,
  ...logisticsResources,
};

/**
 * Create and configure the MCP server instance.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
  });

  // ── Register Resources ────────────────────────────────────────────────
  for (const [key, content] of Object.entries(ALL_RESOURCES)) {
    const uri = `knowledge://${key}`;
    const description = buildResourceDescription(content);

    server.resource(
      key,
      new ResourceTemplate(uri, { list: undefined }),
      {
        description,
        mimeType: "application/json",
      },
      async () => {
        logger.info(`Resource read: ${key}`);
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(content, null, 2),
            },
          ],
        };
      }
    );
  }

  // ── Register Tools ────────────────────────────────────────────────────
  registerSurveyTools(server);
  registerSupportTools(server);
  registerLoiTools(server);
  registerOfferingTools(server);
  registerEnrollmentTools(server);
  registerBillingTools(server);
  registerAttendanceTools(server);
  registerLogisticsTools(server);
  registerCourseTools(server);

  logger.info(
    `Server configured: ${Object.keys(ALL_RESOURCES).length} resources, 15 tools registered.`
  );

  return server;
}

/**
 * Build a rich description string for a resource that FlowiseAI
 * can use for intent routing.
 */
function buildResourceDescription(content: ResourceContent): string {
  const lines: string[] = [
    content.overview,
    "",
    `WHEN TO READ: ${content.whenThisApplies}`,
    "",
    "TYPES OF QUESTIONS IT ANSWERS:",
    ...content.exampleQuestions.map((q) => `  - ${q}`),
  ];

  if (content.relatedTools && content.relatedTools.length > 0) {
    lines.push(
      "",
      `WHEN THIS IS INSUFFICIENT — USE THESE TOOLS INSTEAD: ${content.relatedTools.join(", ")}`
    );
  }

  return lines.join("\n");
}
