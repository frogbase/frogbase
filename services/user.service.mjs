import {
  deleteUserDb,
  getAllUsersDb,
  getUserByEmailDb,
  getUserByIdDb,
  getUserByUsernameDb,
  updateUserDb,
} from "../db/functions/user.db.mjs";

import fs from 'fs';
import ErrorHandler from "../helpers/error.mjs";
import logger from "../utils/logger.mjs";

class UserService {
  async getAllUsers() {
    try {
      return await getAllUsersDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserById(id) {
    try {
      const user = await getUserByIdDb(id);
      if (!user) throw new ErrorHandler(404, "User not found with this user id.");
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByEmail(email) {
    try {
      const user = await getUserByEmailDb(email);
      if (!user) throw new ErrorHandler(404, "User not found with this email.");
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByUsername(username) {
    try {
      const user = await getUserByUsernameDb(username);
      if (!user) throw new ErrorHandler(404, "User not found with this username.");
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async updateUser(user) {
    const { id, username, email, name, avatar } = user;
    const errors = {};
    try {
      const getUser = await getUserByIdDb(id);
      if (!getUser) throw new ErrorHandler(403, "User not found");

      const findUserByEmail = await getUserByEmailDb(email);
      const findUserByUsername = await getUserByUsernameDb(username);

      const emailChanged = email && getUser.email.toLowerCase() !== email.toLowerCase();
      const usernameChanged = username && getUser.username.toLowerCase() !== username.toLowerCase();

      if (emailChanged && typeof findUserByEmail === "object") errors["email"] = "Email is already taken";

      if (usernameChanged && typeof findUserByUsername === "object") errors["username"] = "Username is already taken";

      if (Object.keys(errors).length > 0) throw new ErrorHandler(403, errors);

      if (!user.username) user.username = getUser.username;
      if (!user.email) user.email = getUser.email;
      if (!user.name) user.name = getUser.name;
      if (!user.avatar) user.avatar = getUser.avatar;
      if (user.avatar && getUser.avatar) await this.deleteFile(getUser.avatar)

      return await updateUserDb(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async deleteUser(id) {
    try {
      const user = await deleteUserDb(id);
      if (!user) throw new ErrorHandler(404, "User not found");
      if (user.avatar) await this.deleteFile(user.avatar)
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async deleteFile(path) {
    fs.unlink(path, (err) => {
      if (err) {
        logger.debug(`Error deleting file path: ${path} Error: ${err.message}`);
      } else {
        logger.debug(`File ${path} has been deleted successfully`);
      }
    });
  }
}

export default new UserService();
