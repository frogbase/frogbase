
const logger = require("../../utils/logger.js");
const sql = require('./sql.js');
const { Pool } = require("pg");

const user = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_USER : process.env.POSTGRES_LOCAL_USER;
const password = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_PASSWORD : process.env.POSTGRES_LOCAL_PASSWORD;
const host = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_HOST : process.env.POSTGRES_LOCAL_HOST;
const port = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_PORT : process.env.POSTGRES_LOCAL_PORT;
const default_database = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_DEFAULT_DB : process.env.POSTGRES_LOCAL_DEFAULT_DB;
const database = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_REMOTE_DB : process.env.POSTGRES_LOCAL_DB;
const ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;

const defaultConnectionConfig = {
    user: user,
    password: password,
    host: host,
    port: port,
    database: default_database,
    ssl: ssl,
};

const connectionConfig = {
    user: user,
    password: password,
    host: host,
    port: port,
    database: database,
    ssl: ssl,
};

const defaultPool = new Pool(defaultConnectionConfig);

const pool = new Pool(connectionConfig);

// Connect to the Default PostgreSQL database
// defaultPool.connect()
//     .then(async () => {
//         logger.info(`Connected to Default PostgreSQL database (${default_database}).`);
//         await init_db()
//             .then(() => {
//                 logger.info(`Database initialize complete.`);
//             })
//             .catch((err) => {
//                 logger.error(`Error initializing database: ${err}!`);
//                 throw err;
//             });
//     })
//     .catch((err) => {
//         logger.error(`Error connecting to Default PostgreSQL: ${err}!`);
//         throw err;
//     });

// initialize
async function init() {
    await defaultPool.connect()
        .then(async () => {
            logger.info(`Connected to Default PostgreSQL database (${default_database}).`);
            await init_db()
                .then(() => {
                    logger.info(`Database initialize complete.`);
                })
                .catch((err) => {
                    logger.error(`Error initializing database: ${err}!`);
                    throw err;
                });
        })
        .catch((err) => {
            logger.error(`Error connecting to Default PostgreSQL: ${err}!`);
            throw err;
        });
    return `PostgreSQL database initialized.`;
}

// Create the database if they don't exist
async function init_db() {
    try {
        const dbExists = await defaultPool.query(sql.dbExists);

        logger.info(`Database (${database}) is exists: ${dbExists.rows[0].exists}.`);

        if (!dbExists.rows[0].exists) {
            logger.info(`Creating (${database}) database.....`);

            await defaultPool.query(sql.dbCreate)
                .then(() => {
                    logger.info(`Database (${database}) created.`);
                })
                .catch((err) => {
                    logger.error(`Error creating database (${database}): ${err}!`);
                    throw err;
                });
        } else {
            logger.info(`Database (${database}) already exists.`);
        }
        //
        await change_pool();
        //
    } catch (err) {
        logger.error(`Error checking if database (${database}) exists: ${err}!`);
        throw err;
    }
};

// defaultPool off and pool on for production
async function change_pool() {

    logger.info(`Connecting to (${database}) database.....`);

    await pool.connect()
        .then(async () => {
            logger.info(`Connected to (${database}) database.`);
            await init_tables()
                .then(() => {
                    logger.info(`Tables initialize complete.`);
                })
                .catch((err) => {
                    logger.error(`Error initializing tables: ${err}!`);
                    throw err;
                });
        })
        .catch((err) => {
            logger.error(`Error connecting to (${database}): ${err}!`);
            throw err;
        });

    // Close the Default PostgreSQL connection.
    // await end_default_pool();
}

// Create tables if they don't exist
async function init_tables() {

    await pool.query(sql.tableCreate)
        .then(() => {
            logger.info(`Tables, Functions, Triggers, Indexes created or already exist.`);
        })
        .catch((err) => {
            logger.error(`Error creating tables: ${err}!`);
            throw err;
        });
}

// Close the PostgreSQL connection
async function end_default_pool() {
    logger.info(`Closing Default PostgreSQL (${default_database}) connection.....`);
    await defaultPool.end()
        .then(() => {
            logger.info(`Default PostgreSQL (${default_database}) connection closed.`);
            return;
        }).catch((err) => {
            logger.error(`Error closing Default PostgreSQL (${default_database}) connection: ${err}!`);
            throw err;
        });
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
    init: () => init(),
};