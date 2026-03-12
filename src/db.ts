import pg from "pg";

// Note: dotenv is NOT initialized here because it prints to stdout,
// which breaks the MCP JSON-RPC protocol. Environment variables must
// be provided by the MCP client (e.g., Claude Desktop config) or the runner.


const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export const getClient = () => {
  return pool.connect();
};
