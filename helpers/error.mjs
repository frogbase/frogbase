import { logger } from "../utils/logger.mjs";

export const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    logger.error(err);
    res.status(statusCode || 500).json({
        success: false,
        status: "error",
        statusCode: statusCode || 500,
        message: statusCode === 500 ? "An error occurred" : message,
    });
    next();
};
