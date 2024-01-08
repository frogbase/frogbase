import pino from "pino";

// Create a logging instance
export const logger = pino({
  level: "debug",
  prettyPrint: true,
});
