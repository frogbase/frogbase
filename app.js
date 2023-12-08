const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const helmet = require("helmet");
const compression = require("compression");
const unknownEndpoint = require("./middleware/unKnownEndpoint");

const app = express();

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

app.use(`/api/${process.env.VERSION}`, routes);

// app.get("/", (_, res) =>
//   res.send("<h1 style='text-align: center'>Hey Rahat! Server is up and running! :)</h1>"),
// );

app.use("/", (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Hey Rahat! Server is up and running! :)",
    });
});

app.use('*', unknownEndpoint);

module.exports = app;
