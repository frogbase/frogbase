const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/error");
const { logger } = require("../utils/logger");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ErrorHandler(401, "Token missing in header");

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.id = verified.id
    logger.info(`User verified with id: ${verified.id}`);
    next();
  } catch (error) {
    throw new ErrorHandler(401, error.message || "Invalid Token");
  }
};

module.exports = verifyToken;
