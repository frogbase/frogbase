const pool = require("../config/index.js");
const os = require('os');

class LogDB {
    async create(req, res) {
        const { rows: logs } = await pool.query(
            `INSERT INTO logs(status, method, url, server, client, agent, meta)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            returning *`,
            [
                res.statusCode,
                req.method,
                `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                Object.values(os.networkInterfaces())
                    .flat()
                    .filter((details) => details.family === 'IPv4' && !details.internal)
                    .pop().address,
                req.ip,
                req.headers['user-agent'],
                res.statusMessage,
            ],
        );
        return logs[0];
    };
}

module.exports = new LogDB();