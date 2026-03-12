#!/usr/bin/env node
/**
 * Entry point — starts the MCP server over STDIO transport.
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { logger } from "./utils/logger.js";
async function main() {
    const server = createServer();
    const transport = new StdioServerTransport();
    logger.info("Starting Learning Advisor MCP Server via STDIO transport...");
    await server.connect(transport);
    logger.info("Server is running. Waiting for MCP client messages on stdin.");
}
main().catch((err) => {
    logger.error("Fatal error starting server:", err);
    process.exit(1);
});
