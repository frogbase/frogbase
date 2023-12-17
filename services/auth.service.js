const { getUserByUsernameDb, getUserByEmailDb, createUserDb } = require("../db/functions/user.db");
const { validateEmail, validatePassword } = require("../helpers/validateUser");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const { changeUserPasswordDb } = require("../db/functions/user.db");
const { ErrorHandler } = require("../helpers/error");
const { logger } = require("../utils/logger");
const mail = require("./mail.service");
const jwt = require("jsonwebtoken");

class AuthService {
  async signUp(user) {
    try {
      const { username, email, password, name, avatar } = user;

      if (!username || !email || !password || !name) throw new ErrorHandler(401, "All fields required!");
      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");
      if (!validatePassword(password)) throw new ErrorHandler(401, "Password must be at least 6 characters!");

      const userByUsername = await getUserByUsernameDb(username);
      if (userByUsername) throw new ErrorHandler(401, "Username already taken!");

      const userByEmail = await getUserByEmailDb(email);
      if (userByEmail) throw new ErrorHandler(401, "Email already taken!");

      const hashedPassword = await hashPassword(password);

      const newUser = await createUserDb({ ...user, password: hashedPassword });

      const token = await this.signToken({ id: newUser.id });

      return { token, user: newUser };

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;

      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

      const newUser = await getUserByEmailDb(email);

      if (!newUser) throw new ErrorHandler(403, "No user found with this email.");

      const isCorrectPassword = await comparePassword(password, newUser.password);

      if (!isCorrectPassword) throw new ErrorHandler(403, "Password is incorrect.");

      const token = await this.signToken({ id: newUser.id });

      return { token, user: newUser };

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async resetPassword(user) {
    try {
      const { email } = user;

      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

      const newUser = await getUserByEmailDb(email);

      if (!newUser) throw new ErrorHandler(403, "No user found with this email.");

      await mail.resetPasswordMail(newUser);

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  // will used later in email verification
  async changePassword(user) {
    try {
      const { email, password } = user;

      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

      const newUser = await getUserByEmailDb(email);

      if (!newUser) throw new ErrorHandler(403, "No user found with this email.");

      if (!validatePassword(password)) throw new ErrorHandler(401, "Password must be at least 6 characters!");

      const hashedPassword = await hashPassword(password);

      await changeUserPasswordDb(email, hashedPassword);
      await mail.resetPasswordMail(email);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async signToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: process.env.SECRET_EXP });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, "An error occurred while signing token.");
    }
  }
}

module.exports = new AuthService();
