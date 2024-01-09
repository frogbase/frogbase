import * as dotenv from 'dotenv';
dotenv.config();

import http from "http";
import app from "./app.mjs";
import { logger } from "./utils/logger.mjs";

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

server.listen(PORT, IP, () =>
    logger.info(
        `Server is running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT}.\n>> Visit: http://localhost:${PORT}/api/health/\n>> Admin: http://localhost:${PORT}/admin/\nPlease press CTRL + C to stop the server`,
    ),
);
