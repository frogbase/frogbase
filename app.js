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

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || `0.0.0.0`;

app.use(`/api/health`, (req, res, _) => {
    // TODO: Add device information
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Hey buddy! Server is up and running (${process.env.NODE_ENV}) on ip: ${IP} and port: ${PORT} 🌐`,
        device: req.headers['user-agent']
    });
});

app.use(unknownEndpoint);
app.use(handleError);

module.exports = app;
