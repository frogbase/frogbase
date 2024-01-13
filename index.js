require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const app = require("./app.js");

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

server.listen(PORT, IP, () =>
    console.log(
        `
        ╔════════════════════════════════════════════════════════════════╗
        ║ Server is running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT}. ║
        ╟────────────────────────────────────────────────────────────────╢
        ║ >> Visit: http://localhost:${PORT}/api/health/                    ║
        ║ >> Draft: http://localhost:${PORT}/api/docs/                      ║
        ║ >> Admin: http://localhost:${PORT}/admin/                         ║
        ╟────────────────────────────────────────────────────────────────╢
        ║           Please press CTRL + C to stop the server.            ║
        ╚════════════════════════════════════════════════════════════════╝
        `,
    ),
);
