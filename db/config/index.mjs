import * as dotenv from 'dotenv';
import pkg from 'pg';
import { logger } from "../../utils/logger.mjs";
import sql from './sql.mjs';
dotenv.config();
const { Pool } = pkg;

const defaultConnectionConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DEFAULT_DB,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const connectionConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const defaultPool = new Pool(defaultConnectionConfig);

const pool = new Pool(connectionConfig);

// Connect to the Default PostgreSQL database
await defaultPool.connect()
    .then(async () => {
        logger.info(`Connected to Default PostgreSQL database.`);
        await init_db()
            .then(() => {
                logger.info(`Database initialize complete!`);
            })
            .catch((err) => {
                logger.error(`Error initializing database: ${err}`);
            });
    })
    .catch((err) => {
        logger.error(`Error connecting to Default PostgreSQL: ${err}`);
    });

// Create the database if they don't exist
async function init_db() {
    try {
        const dbExists = await defaultPool.query(sql.dbExists);

        logger.info(`Database (${process.env.POSTGRES_DB}) is exists: ${dbExists.rows[0].exists}`);

        if (!dbExists.rows[0].exists) {
            logger.info(`Creating (${process.env.POSTGRES_DB}) database.`);

            await defaultPool.query(sql.dbCreate)
                .then(() => {
                    logger.info(`Database (${process.env.POSTGRES_DB}) created!`);
                })
                .catch((err) => {
                    logger.error(`Error creating database (${process.env.POSTGRES_DB}):`, err);
                    throw err;
                });
        } else {
            logger.info(`Database (${process.env.POSTGRES_DB}) already exists.`);
        }
        //
        await change_pool();
        //
    } catch (err) {
        throw err;
    }
};

// defaultPool off and pool on for production
async function change_pool() {

    logger.info(`Connecting to (${process.env.POSTGRES_DB}) database...`);

    await pool.connect()
        .then(async () => {
            logger.info(`Connected to (${process.env.POSTGRES_DB}) database.`);
            await init_tables()
                .then(() => {
                    logger.info(`Tables initialize complete!`);
                })
                .catch((err) => {
                    console.error(`Error initializing tables: ${err}`);
                });
        })
        .catch((err) => {
            logger.error(`Error connecting to (${process.env.POSTGRES_DB}): ${err}`);
            throw err;
        });
    // Close the Default PostgreSQL connection
    // await end_default_pool();
}

// Create tables if they don't exist
async function init_tables() {

    await pool.query(sql.tableCreate)
        .then(() => {
            logger.info('Tables created or already exist');
        })
        .catch((err) => {
            logger.error('Error creating tables: ', err);
            throw err;
        });
}

// Close the PostgreSQL connection
async function end_default_pool() {
    logger.info("Closing Default PostgreSQL connection...");
    await defaultPool.end()
        .then(() => {
            logger.info(`Default PostgreSQL connection closed.`);
            return;
        }).catch((err) => {
            logger.error(`Error closing Default PostgreSQL connection: ${err}`);
            throw err;
        });
}



export default {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
    status: 'Success'
};