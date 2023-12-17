const pool = require("../config");

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("SELECT * FROM users");
  return users.map(user => {
    delete user.password;
    return user;
  });
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
  user = users[0];
  delete user.password;
  return user;
};

const getUserByIdDb = async (id) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  user = users[0];
  delete user.password;
  return user;
};

const getUserByUsernameDb = async (username) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE username = lower($1)`, [username]);
  user = users[0];
  delete user.password;
  return user;
};

const getUserByEmailDb = async (email) => {
  const { rows: users } = await pool.query(`SELECT * FROM users WHERE email = lower($1)`, [email]);
  user = users[0];
  delete user.password;
  return user;
};

const updateUserDb = async ({ id, username, email, name, avatar }) => {
  const { rows: users } = await pool.query(
    `UPDATE users set username = $2, email = $3, name = $4, avatar = $5
    WHERE id = $1
    RETURNING *`,
    [id, username, email, name, avatar],
  );
  user = users[0];
  delete user.password;
  return user;
};

const deleteUserDb = async (id) => {
  const { rows: users } = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
  user = users[0];
  delete user.password;
  return user;
};

const changeUserPasswordDb = async (email, password) => {
  const { rows: users } = await pool.query(`UPDATE users SET password = $2 WHERE email = $1 RETURNING *`, [email, password]);
  user = users[0];
  delete user.password;
  return user;
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
