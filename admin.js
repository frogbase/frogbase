
const ErrorHandler = require("./helpers/error.class.js");
const pool = require('./db/config/index.js');

const admin = async (_, res) => {
    try {
        const users = (await pool.query('SELECT * FROM users'));
        const posts = (await pool.query('SELECT * FROM posts'));
        const logs = (await pool.query('SELECT * FROM logs'));

        res.render('admin', { data: { users, posts, logs } });
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new ErrorHandler(500, 'Internal Server Error!');
    }
}

module.exports = admin;