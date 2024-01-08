import dotenv from 'dotenv';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import http from "http";
import app from "./app.mjs";
import { logger } from "./utils/logger.mjs";

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

server.listen(PORT, IP, () =>
    logger.info(
        `Server is running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT}.\n >> Visit http://localhost:${PORT}/api/health/\nPlease press CTRL + C to stop the server`,
    ),
);
