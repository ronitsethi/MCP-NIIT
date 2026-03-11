/**
 * Simulates backend latency for mock service calls.
 */

import { MOCK_DELAY_MS } from "../config.js";

export function mockDelay(ms?: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms ?? MOCK_DELAY_MS));
}
