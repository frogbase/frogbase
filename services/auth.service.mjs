import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import authDB from "../db/functions/auth.db.mjs";
import userDB from "../db/functions/user.db.mjs";
import { ErrorHandler } from "../helpers/error.class.mjs";
import { comparePassword, hashPassword } from "../helpers/hashPassword.mjs";
import { validateEmail, validatePassword } from "../helpers/validateUser.mjs";
import { logger } from "../utils/logger.mjs";
import mail from "./mail.service.mjs";

let curDate = moment().format();

class AuthService {
  async signUp(user) {
    try {
      const { username, email, password, name, avatar } = user;

      if (!username || !email || !password || !name) throw new ErrorHandler(401, "All fields required!");
      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");
      if (!validatePassword(password)) throw new ErrorHandler(401, "Password must be at least 6 characters!");

      const userByUsername = await userDB.getByUsername(username);
      if (userByUsername) throw new ErrorHandler(401, "Username already taken!");

      const userByEmail = await userDB.getByEmail(email);
      if (userByEmail) throw new ErrorHandler(401, "Email already taken!");

      const hashedPassword = await hashPassword(password);

      const newUser = await userDB.create({ ...user, password: hashedPassword });

      const accessToken = await this.signAccessToken({ id: newUser.id });

      const refreshToken = await this.signRefreshToken({ id: newUser.id });

      return { accessToken, refreshToken, user: newUser };

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async signin(user) {
    try {
      const { email, password } = user;

      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

      const newUser = await userDB.getByEmail(email);

      if (!newUser) throw new ErrorHandler(403, "No user found with this email.");

      const isCorrectPassword = await comparePassword(password, newUser.password);

      if (!isCorrectPassword) throw new ErrorHandler(403, "Password is incorrect.");

      const accessToken = await this.signAccessToken({ id: newUser.id });

      const refreshToken = await this.signRefreshToken({ id: newUser.id });

      return { accessToken, refreshToken, user: newUser };

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async signAccessToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: process.env.SECRET_EXP });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, "An error occurred while signing token.");
    }
  }

  async signRefreshToken(data) {
    try {
      return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_SECRET_EXP });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, `An error occurred while verifying access token. ${error.message}`);
    }
  }

  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, `An error occurred while verifying refresh token. ${error.message}`);
    }
  }

  async regenerateTokens(token) {
    const payload = await this.verifyRefreshToken(token);

    const accessToken = await this.signAccessToken({ id: payload.id });
    const refreshToken = await this.signRefreshToken({ id: payload.id });

    return {
      accessToken,
      refreshToken,
    };
  }

  async forgetPassword(email) {

    if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

    const user = await userDB.getByEmail(email);

    if (!user) throw new ErrorHandler(403, "No user found with this email.");

    try {
      await authDB.deleteResetToken(curDate);
      await authDB.setTokenStatus(email);

      //Create a random reset token
      var fpSalt = crypto.randomBytes(64).toString("base64").slice(0, 6);

      //token expires after 15 mintues
      var expireDate = moment().add(15, "m").format();

      await authDB.createResetToken({ email, expireDate, fpSalt });

      return { user, fpSalt };
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async resetPassword(email, token, password) {

    if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");
    if (!validatePassword(password)) throw new ErrorHandler(401, "Password must be at least 6 characters!");

    const user = await userDB.getByEmail(email);
    if (!user) throw new ErrorHandler(403, "No user found with this email.");

    try {
      const isTokenValid = await authDB.isValidToken({ token, email, curDate });

      if (!isTokenValid) throw new ErrorHandler(400, "Token is invalid! Please try the reset password process again.",);

      await authDB.setTokenStatus(email);

      const hashedPassword = await hashPassword(password);

      return await userDB.changePassword(email, hashedPassword);

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async changePassword(email, oldPassword, newPassword) {
    try {

      if (!validateEmail(email)) throw new ErrorHandler(401, "Invalid email!");

      const user = await userDB.getByEmaib(email);

      if (!user) throw new ErrorHandler(403, "No user found with this email.");

      const isCorrectPassword = await comparePassword(oldPassword, user.password);

      if (!isCorrectPassword) throw new ErrorHandler(403, "Password is incorrect.");

      if (!validatePassword(newPassword)) throw new ErrorHandler(401, "Password must be at least 6 characters!");

      const hashedPassword = await hashPassword(newPassword);

      const newUser = await userDB.changePassword(email, hashedPassword);

      await mail.changePasswordMail(newUser);

      return newUser;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

export default new AuthService();
