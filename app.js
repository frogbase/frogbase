const compression = require("compression");
const cors = require("cors");
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const handleError = require("./helpers/error.js");
const unknownEndpoint = require("./middleware/unknown.endpoint.js");
const routes = require("./routes/index.js");
const app = express();
const logMiddleware = require("./middleware/log.js");

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use("/uploads", express.static("uploads"));

app.use(logMiddleware);

app.use(`/api`, routes);

app.use('*', unknownEndpoint);
app.use(handleError);

module.exports = app;