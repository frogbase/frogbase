const userDB = require("../db/functions/user.db.js");
const fs = require('fs');
const ErrorHandler = require("../helpers/error.class.js");
const logger = require("../utils/logger.js");

class UserService {
  async getAllUsers() {
    try {
      return await userDB.getAll();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserById(id) {
    try {
      const user = await userDB.getById(id);
      if (!user) throw new ErrorHandler(404, "User not found with this user id.");
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByEmail(email) {
    try {
      const user = await userDB.getByEmail(email);
      if (!user) throw new ErrorHandler(404, "User not found with this email.");
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByUsername(username) {
    try {
      const user = await userDB.getByUsername(username);
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
      const getUser = await userDB.getById(id);
      if (!getUser) throw new ErrorHandler(403, "User not found");

      const findUserByEmail = await userDB.getByEmail(email);
      const findUserByUsername = await userDB.getByUsername(username);

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

      return await userDB.update(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async deleteUser(id) {
    try {
      const user = await userDB.delete(id);
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

module.exports = new UserService();
