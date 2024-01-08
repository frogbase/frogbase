import compression from "compression";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import { handleError } from "./helpers/error.mjs";
import { unknownEndpoint } from "./middleware/unKnownEndpoint.mjs";
import routes from "./routes/index.mjs";

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

app.use('*', unknownEndpoint);
app.use(handleError);

export default app;
