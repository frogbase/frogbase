const logDB = require("../db/functions/log.db.js");

const logMiddleware = async (req, res, next) => {
    // Skip logging for requests coming from AdminJS or for specific URLs
    if (req.path.startsWith('/admin') || req.url === '/favicon.ico') return next();

    // Call the next middleware in the stack
    await next();

    // Wait until the response has been sent to the client
    res.on('finish', async () => {
        // Log the request and response information
        await logDB.create(req, res);
    });
};

module.exports = logMiddleware;
