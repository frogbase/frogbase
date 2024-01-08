import AdminJSExpress from '@adminjs/express';
import { Adapter, Database, Resource } from '@adminjs/sql';
import AdminJS from 'adminjs';

import Connect from 'connect-pg-simple';

import { dark, light, noSidebar } from '@adminjs/themes';
import "express-async-errors";
import session from 'express-session';


const connectionString = `postgresql://postgres:72428@localhost:5432/frogbase`;

AdminJS.registerAdapter({ Database, Resource });

const db = await new Adapter('postgresql', {
    connectionString: connectionString,
    database: 'frogbase',
}).init()

const DEFAULT_ADMIN = { email: 'admin@algoramming.com', password: '@Admin123' }

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) return Promise.resolve(DEFAULT_ADMIN)
    return null
}

const admin = new AdminJS({
    branding: {
        companyName: 'FrogBase',
        favicon: 'https://avatars.githubusercontent.com/u/153280938?s=48&v=4',
        logo: 'https://avatars.githubusercontent.com/u/153280938?s=200&v=4',
        withMadeWithLove: false,
    },
    settings: { defaultPerPage: 10 },
    defaultTheme: light.id,
    availableThemes: [dark, light, noSidebar],
    version: { admin: true, app: process.env.PROJECT_VERSION || '0.0.0' },
    rootPath: "/admin",
    resources: [
        {
            resource: db.table('users'),
            options: {},
        },
        {
            resource: db.table('posts'),
            options: {},
        },
    ],
    // databases: [db], <- not recommended,
});

const ConnectSession = Connect(session);

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
    admin,
    {
        authenticate,
        cookieName: process.env.COOKIE_NAME || 'adminjs',
        cookiePassword: process.env.COOKIE_SECRET || 'supersecret',
    },
    null,
    {
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        secret: process.env.COOKIE_SECRET || 'supersecret',
        cookie: {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
        },
        name: process.env.COOKIE_NAME || 'adminjs',
    }
);

export default adminRouter;