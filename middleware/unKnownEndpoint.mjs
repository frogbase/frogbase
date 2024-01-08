import ErrorHandler from "../helpers/error.class.mjs";

// eslint-disable-next-line no-unused-vars
export const unknownEndpoint = (_, __) => {
  throw new ErrorHandler(401, "unknown endpoint");
};
