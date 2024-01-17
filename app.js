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
const path = require('path');
const admin = require('./admin.js');

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());


app.use("/uploads", express.static("uploads"));
app.get('/favicon.ico', (_, res) => res.status(204));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logMiddleware);

app.use(`/api`, routes);

app.get('/admin', admin);

app.use('*', unknownEndpoint);
app.use(handleError);

module.exports = app;
