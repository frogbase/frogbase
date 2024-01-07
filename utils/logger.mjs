import pino from "pino";

// Create a logging instance
const logger = pino({
  level: "debug",
  prettyPrint: true,
});

export default { logger };
