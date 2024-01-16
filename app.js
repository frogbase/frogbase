const compression = require("compression");
const cors = require("cors");
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const handleError = require("./helpers/error.js");
const unknownEndpoint = require("./middleware/unknown.endpoint.js");
const routes = require("./routes/index.js");
const app = express();
// const logMiddleware = require("./middleware/log.js");
const pool = require("./db/config/index.js");

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use("/uploads", express.static("uploads"));
// app.use(logMiddleware);

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

// adminJsSetup(app);

app.use('*', unknownEndpoint);
app.use(handleError);

module.exports = app;

// // AdminJS Setup
// function adminJsSetup(app) {
//     Promise.all([
//         import('adminjs'),
//         import('@adminjs/express'),
//         import('connect-pg-simple'),
//         import('express-session'),
//         import('@adminjs/sql'),
//     ]).then(async ([
//         { default: AdminJS },
//         { default: AdminJSExpress },
//         { default: Connect },
//         { default: session },
//         { default: Adapter, Resource, Database },
//     ]) => {

//         AdminJS.registerAdapter({ Database, Resource })

//         const db = await new Adapter('postgresql', {
//             connectionString: pool.connectionString,
//             database: process.env.POSTGRES_DB,
//         }).init();

//         const DEFAULT_ADMIN = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }

//         const authenticate = async (email, password) => {
//             if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) return Promise.resolve(DEFAULT_ADMIN)
//             return null
//         }

//         const adminJS = new AdminJS({
//             branding: {
//                 companyName: process.env.PROJECT_NAME,
//                 logo: process.env.ADMIN_LOGO,
//                 favicon: process.env.ADMIN_FAVICON,
//                 withMadeWithLove: false,
//                 theme: {
//                     colors: {
//                         primary100: "#008080",
//                         primary80: "#008080",
//                         primary60: "#008080",
//                         primary40: "#008080",
//                         primary20: "#008080",
//                         accent: "#008080",
//                         accent75: "#008080",
//                         accent50: "#008080",
//                         accent25: "#008080",
//                     },
//                 },
//             },
//             settings: { defaultPerPage: 25 },
//             version: { admin: true, app: process.env.PROJECT_VERSION },
//             rootPath: "/admin",
//             resources: [
//                 {
//                     resource: db.table('users'),
//                     options: {
//                         sort: {
//                             sortBy: 'id',
//                             direction: 'desc',
//                         },
//                         listProperties: ['id', 'username', 'email', 'name', 'avatar', 'created', 'updated'],
//                         showProperties: ['id', 'username', 'email', 'name', 'avatar', 'created', 'updated'],
//                         editProperties: ['username', 'email', 'name', 'avatar'],
//                     },
//                 },
//                 {
//                     resource: db.table('posts'),
//                     options: {
//                         sort: {
//                             sortBy: 'id',
//                             direction: 'desc',
//                         },
//                         listProperties: ['id', 'title', 'description', 'creator', 'updator', 'created', 'updated'],
//                         showProperties: ['id', 'title', 'description', 'creator', 'updator', 'created', 'updated'],
//                         editProperties: ['title', 'description', 'creator', 'updator'],
//                     },
//                 },
//                 // {
//                 //     resource: db.table('logs'),
//                 //     options: {
//                 //         sort: {
//                 //             sortBy: 'id',
//                 //             direction: 'desc',
//                 //         },
//                 //         listProperties: ['id', 'status', 'method', 'url', 'server', 'client', 'agent', 'meta', 'created', 'updated'],
//                 //         showProperties: ['id', 'status', 'method', 'url', 'server', 'client', 'agent', 'meta', 'created', 'updated'],
//                 //         editProperties: ['status', 'method', 'url', 'server', 'client', 'agent', 'meta'],
//                 //     },
//                 // },
//             ],
//             // databases: [db], <- not recommended,
//         });
//         const ConnectSession = Connect(session)
//         const sessionStore = new ConnectSession({
//             conObject: {
//                 connectionString: pool.connectionString,
//                 ssl: pool.ssl,
//             },
//             tableName: process.env.ADMIN_SESSION_TABLE,
//             createTableIfMissing: true,
//         });
//         const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//             adminJS,
//             {
//                 authenticate,
//                 cookieName: process.env.COOKIE_NAME,
//                 cookiePassword: process.env.COOKIE_SECRET,
//             },
//             null,
//             {
//                 store: sessionStore,
//                 resave: true,
//                 saveUninitialized: true,
//                 secret: process.env.COOKIE_SECRET,
//                 cookie: {
//                     httpOnly: pool.ssl,
//                     secure: pool.ssl,
//                 },
//                 name: process.env.COOKIE_NAME,
//             }
//         )
//         app.use(adminJS.options.rootPath, adminRouter);

//         // app.use('*', unknownEndpoint);
//         // app.use(handleError);
//     });
// }