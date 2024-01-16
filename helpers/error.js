const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    console.log(err);
    res.status(statusCode || 500).json({
        success: false,
        status: "error",
        statusCode: statusCode || 500,
        message: statusCode === 500 ? "Internal Server Error" : message,
    });
    next();
};

module.exports = handleError;
