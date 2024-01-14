
const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// const ssl = process.env.NODE_ENV === "production"  ? { rejectUnauthorized: false } : false;
const ssl = false;

const pool = new Pool({
    connectionString,
    ssl: ssl,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
    connectionString: connectionString,
    ssl: ssl,
};