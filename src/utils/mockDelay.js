/**
 * Simulates backend latency for mock service calls.
 */
import { MOCK_DELAY_MS } from "../config.js";
export function mockDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms ?? MOCK_DELAY_MS));
}
