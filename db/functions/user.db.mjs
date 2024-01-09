import pool from "../config/index.mjs";

class UserDB {
  async getAll() {
    const { rows: users } = await pool.query("SELECT * FROM users");
    return users;
  };

  async create({ username, email, password, name, avatar }) {
    email = email.trim();
    avatar = avatar || null;
    const { rows: users } = await pool.query(
      `INSERT INTO users(username, email, password, name, avatar)
    VALUES(lower($1), lower($2), $3, $4, $5)
    returning *`,
      [username, email, password, name, avatar],
    );
    return users[0];
  };

  async getById(id) {
    const { rows: users } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return users[0];
  };

  async getByUsername(username) {
    const { rows: users } = await pool.query(`SELECT * FROM users WHERE username = lower($1)`, [username]);
    return users[0];
  };

  async getByEmail(email) {
    const { rows: users } = await pool.query(`SELECT * FROM users WHERE email = lower($1)`, [email]);
    return users[0];
  };

  async update({ id, username, email, name, avatar }) {
    const { rows: users } = await pool.query(
      `UPDATE users set username = $2, email = $3, name = $4, avatar = $5
    WHERE id = $1
    RETURNING *`,
      [id, username, email, name, avatar],
    );
    return users[0];
  };

  async deleteUserDb(id) {
    const { rows: users } = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return users[0];
  };

  async changePassword(email, password) {
    const { rows: users } = await pool.query(`UPDATE users SET password = $2 WHERE email = $1 RETURNING *`, [email, password]);
    return users[0];
  };
}

export default new UserDB();