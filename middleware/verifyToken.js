const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/error");
const pool = require("../db/config")

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ErrorHandler(401, "Token missing in header");

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    const { rows: users } = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [verified.id],
    );
    if (!users[0]) throw new ErrorHandler(404, "Invalid user access.")
    req.user = users[0]
    next();
  } catch (error) {
    throw new ErrorHandler(401, error.message || "Invalid Token");
  }
};

module.exports = verifyToken;
