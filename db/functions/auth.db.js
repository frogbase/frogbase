const pool = require("../config/index.js");

class AuthDB {
    async isValidToken({ token, email, curDate }) {
        const { rows: tokens } = await pool.query(
            `SELECT EXISTS(
            SELECT * FROM public."resetTokens"
            WHERE token = $1 AND email = $2 AND expiration > $3 AND used = $4
        )`,
            [token, email, curDate, false],
        );
        return tokens[0].exists;
    };

    async createResetToken({ email, expireDate, fpSalt }) {
        await pool.query(
            `INSERT INTO public."resetTokens" (email, expiration, token) VALUES ($1, $2, $3)`,
            [email, expireDate, fpSalt],
        );
        return true;
    };

    async setTokenStatus(email) {
        await pool.query(
            `UPDATE public."resetTokens" SET used = $1 WHERE email = $2`,
            [true, email],
        );
        return true;
    };

    async deleteResetToken(curDate) {
        await pool.query(
            `DELETE FROM public."resetTokens" WHERE expiration <= $1`,
            [curDate],
        );
        return true;
    };
}

module.exports = new AuthDB();
