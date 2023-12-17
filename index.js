require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const app = require("./app");
const { logger } = require("./utils/logger");

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

server.listen(PORT, IP, () =>
    logger.info(
        `Server is running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT}.\n >> Visit http://localhost:${PORT}/api/${process.env.VERSION}/check/\nPlease press CTRL + C to stop the server`,
    ),
);
