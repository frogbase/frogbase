const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const pool = new Pool({
  connectionString,
  /*
  SSL is not supported in development
  */
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
