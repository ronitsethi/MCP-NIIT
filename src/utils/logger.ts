/**
 * Lightweight console logger with configurable level.
 */

import { LOG_LEVEL } from "../config.js";

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;

const currentLevel = LEVELS[LOG_LEVEL] ?? LEVELS.info;

function stamp(): string {
  return new Date().toISOString();
}

export const logger = {
  debug(...args: unknown[]) {
    if (currentLevel <= LEVELS.debug)
      console.error(`[${stamp()}] [DEBUG]`, ...args);
  },
  info(...args: unknown[]) {
    if (currentLevel <= LEVELS.info)
      console.error(`[${stamp()}] [INFO]`, ...args);
  },
  warn(...args: unknown[]) {
    if (currentLevel <= LEVELS.warn)
      console.error(`[${stamp()}] [WARN]`, ...args);
  },
  error(...args: unknown[]) {
    if (currentLevel <= LEVELS.error)
      console.error(`[${stamp()}] [ERROR]`, ...args);
  },
};
