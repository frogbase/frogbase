import os from 'os';

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

const healthCheck = (req, res) => {
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Hey buddy! Server is up and running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT} 🌐`,
        log: {
            method: req.method,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            "remote-ip": Object.values(os.networkInterfaces())
                .flat()
                .filter((details) => details.family === 'IPv4' && !details.internal)
                .pop().address,
            'user-ip': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            'user-agent': req.headers['user-agent'],
        }
    });
};

export default { healthCheck };
