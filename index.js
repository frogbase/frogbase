require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const app = require("./app");
const { logger } = require("./utils/logger");

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

server.listen(PORT, IP, () =>
    logger.info(
        `Server is running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT}.\n>> Visit: http://localhost:${PORT}/api/health/\n>> Admin: http://localhost:${PORT}/admin/\nPlease press CTRL + C to stop the server`,
    ),
);


// const express = require('express');

// Promise.all([
//     import('adminjs'),
//     import('@adminjs/express'),
// ]).then(([{ default: AdminJS }, { default: AdminJSExpress }]) => {
//     const PORT = 3000
//     const app = express()

//     const admin = new AdminJS({})

//     const adminRouter = AdminJSExpress.buildRouter(admin)
//     app.use(admin.options.rootPath, adminRouter)

//     app.listen(PORT, () => {
//         console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
//     })
// });