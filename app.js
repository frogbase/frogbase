const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
// const helmet = require("helmet");
const compression = require("compression");
const unknownEndpoint = require("./middleware/unKnownEndpoint");
const { handleError } = require("./helpers/error");
const { pool } = require("./db/config");


const app = express();

Promise.all([
    import('adminjs'),
    import('@adminjs/express'),
]).then(([{ default: AdminJS }, { default: AdminJSExpress }]) => {

    app.set("trust proxy", 1);
    app.use(cors({ credentials: true, origin: true }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(compression());
    // app.use(helmet());
    app.use("/uploads", express.static("uploads"));

    // CORS handling
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });

    app.use(`/api`, routes);

    const adminJS = new AdminJS({});
    const adminRouter = AdminJSExpress.buildRouter(adminJS)
    app.use(adminJS.options.rootPath, adminRouter)

    app.use('*', unknownEndpoint);
    app.use(handleError);
});

module.exports = app;

