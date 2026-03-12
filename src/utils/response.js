/**
 * Standardized response builder for all MCP tool outputs.
 */
import { randomUUID } from "node:crypto";
export function buildToolResponse(toolName, success, message, data, opts) {
    return {
        success,
        toolName,
        message,
        timestamp: new Date().toISOString(),
        data,
        mockReferenceId: `MOCK-${randomUUID().slice(0, 8).toUpperCase()}`,
        ...(opts?.nextRecommendedStep && {
            nextRecommendedStep: opts.nextRecommendedStep,
        }),
        ...(opts?.relatedResource && { relatedResource: opts.relatedResource }),
    };
}
