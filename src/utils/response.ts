/**
 * Standardized response builder for all MCP tool outputs.
 */

import { randomUUID } from "node:crypto";
import type { ToolResponse } from "../types/common.js";

export function buildToolResponse<T extends Record<string, unknown>>(
  toolName: string,
  success: boolean,
  message: string,
  data: T,
  opts?: {
    nextRecommendedStep?: string;
    relatedResource?: string;
  }
): ToolResponse<T> {
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
