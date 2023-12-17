const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const helmet = require("helmet");
const compression = require("compression");
const unknownEndpoint = require("./middleware/unKnownEndpoint");
const { handleError } = require("./helpers/error");

const app = express();

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

app.use(`/api/${process.env.VERSION}`, routes);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

app.use(`/api/${process.env.VERSION}/check`, (_, res, __) => {
    return res.status(200).json({
        success: true,
        message: `Hey buddy! Server is up and running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT} 🌐`,
    });
});

app.use(unknownEndpoint);
app.use(handleError);

module.exports = app;
