const pino = require("pino");

// Create a logging instance
const logger = pino({
  level: "debug",
  prettyPrint: true,
});

module.exports.logger = logger;
