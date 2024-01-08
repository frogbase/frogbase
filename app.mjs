import compression from "compression";
import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import path from 'path';
import { handleError } from "./helpers/error.mjs";
import { unknownEndpoint } from "./middleware/unKnownEndpoint.mjs";
import routes from "./routes/index.mjs";
import adminRouter from './services/admin.service.mjs';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const app = express();

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
<<<<<<< HEAD:app.js
// app.use(helmet());
app.use("/uploads", express.static("uploads"));
=======
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
>>>>>>> 78097b7490017c6a7b3c738a9ab6afa9225d048c:app.mjs

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
app.use('/admin', adminRouter);

Promise.all([
    import('adminjs'),
    import('@adminjs/express'),
    import('connect-pg-simple'),
    import('express-session'),
    import('@adminjs/sql'),
]).then(async ([
    { default: AdminJS },
    { default: AdminJSExpress },
    { default: Connect },
    { default: session },
    { default: { Adapter, Resource, Database } },
]) => {
    const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

    AdminJS.registerAdapter({ Database, Resource })

    const db = await new Adapter('postgresql', {
        connectionString: connectionString,
        database: process.env.POSTGRES_DB,
    }).init();

    const DEFAULT_ADMIN = { email: 'admin@algoramming.com', password: '@Admin123', name: 'FrogBase Admin' }

    const authenticate = async (email, password) => {
        if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) return Promise.resolve(DEFAULT_ADMIN)
        return null
    }

    const adminJS = new AdminJS({
        version: { admin: true, app: process.env.PROJECT_VERSION },
        rootPath: "/admin",
        databases: [db],
    });
    const ConnectSession = Connect(session)
    const sessionStore = new ConnectSession({
        conObject: {
            connectionString: connectionString,
            /*
            SSL is not supported in development
            */
            ssl:
                process.env.NODE_ENV === "production"
                    ? { rejectUnauthorized: false }
                    : false,
        },
        tableName: 'adminjs',
        createTableIfMissing: true,
    });
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        adminJS,
        {
            authenticate,
            cookieName: process.env.COOKIE_NAME,
            cookiePassword: process.env.COOKIE_SECRET,
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            },
            name: process.env.COOKIE_NAME,
        }
    )
    app.use(adminJS.options.rootPath, adminRouter)

    app.use('*', unknownEndpoint);
    app.use(handleError);
});

<<<<<<< HEAD:app.js
module.exports = app;

=======
export default app;
>>>>>>> 78097b7490017c6a7b3c738a9ab6afa9225d048c:app.mjs
