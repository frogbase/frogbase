const pool = require("../config");

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("SELECT * FROM users");
  return users;
};

const createUserDb = async ({ username, email, password, name, avatar }) => {
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

const getUserByIdDb = async (id) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return users[0];
};

const getUserByUsernameDb = async (username) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE username = lower($1)`, [username]);
  return users[0];
};

const getUserByEmailDb = async (email) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE email = lower($1)`, [email]);
  return users[0];
};

const updateUserDb = async ({ id, username, email, name, avatar }) => {
  const { rows: users } = await pool.query(
    `UPDATE users set username = $2, email = $3, name = $4, avatar = $5
    WHERE id = $1
    RETURNING *`,
    [id, username, email, name, avatar],
  );
  return users[0];
};

const deleteUserDb = async (id) => {
  const { rows: users } = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
  return users[0];
};

const changeUserPasswordDb = async (email, password) => {
  const { rows: users } = await pool.query(`UPDATE users SET password = $2 WHERE email = $1 RETURNING *`, [email, password]);
  return users[0];
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  getUserByUsernameDb,
  createUserDb,
  updateUserDb,
  deleteUserDb,
  changeUserPasswordDb,
};
