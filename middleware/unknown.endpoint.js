const ErrorHandler = require("../helpers/error.class.js");

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (_, __) => {
  throw new ErrorHandler(401, "unknown endpoint");
};

module.exports = unknownEndpoint;