import AdminJSExpress from '@adminjs/express';
import { Adapter, Database, Resource } from '@adminjs/sql';
import AdminJS from 'adminjs';
import Connect from 'connect-pg-simple';
import * as dotenv from 'dotenv';
import "express-async-errors";
import session from 'express-session';
dotenv.config();

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

AdminJS.registerAdapter({ Database, Resource });

const db = await new Adapter('postgresql', {
    connectionString: connectionString,
    database: process.env.POSTGRES_DB,
}).init()

const DEFAULT_ADMIN = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) return Promise.resolve(DEFAULT_ADMIN)
    return null
}

const adminJS = new AdminJS({
    branding: {
        companyName: process.env.PROJECT_NAME,
        logo: process.env.ADMIN_LOGO,
        favicon: process.env.ADMIN_FAVICON,
        withMadeWithLove: false,
        theme: {
            colors: {
                primary100: "#008080",
                primary80: "#008080",
                primary60: "#008080",
                primary40: "#008080",
                primary20: "#008080",
                accent: "#008080",
                accent75: "#008080",
                accent50: "#008080",
                accent25: "#008080",
            },
        },
    },
    settings: { defaultPerPage: 15 },
    version: { admin: true, app: process.env.PROJECT_VERSION },
    rootPath: "/admin",
    resources: [
        {
            resource: db.table('users'),
            options: {
                sort: {
                    sortBy: 'id',
                    direction: 'asc',
                },
                listProperties: ['id', 'username', 'email', 'name', 'avatar', 'created', 'updated'],
                showProperties: ['id', 'username', 'email', 'name', 'avatar', 'created', 'updated'],
                editProperties: ['username', 'email', 'name', 'avatar'],
            },
        },
        {
            resource: db.table('posts'),
            options: {
                sort: {
                    sortBy: 'id',
                    direction: 'asc',
                },
                listProperties: ['id', 'title', 'description', 'creator', 'updator', 'created', 'updated'],
                showProperties: ['id', 'title', 'description', 'creator', 'updator', 'created', 'updated'],
                editProperties: ['title', 'description', 'creator', 'updator'],
            },
        },
    ],
    // databases: [db], <- not recommended,
});

const ConnectSession = Connect(session);

const sessionStore = new ConnectSession({
    conObject: {
        connectionString: connectionString,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
    },
    tableName: process.env.ADMIN_SESSION_TABLE,
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
);

export default adminRouter;