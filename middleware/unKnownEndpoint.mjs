import ErrorHandler from "../helpers/error.mjs";

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (_, __) => {
  throw new ErrorHandler(401, "unknown endpoint");
};

export default unknownEndpoint;
