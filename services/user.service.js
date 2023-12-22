const {
  getUserByEmailDb,
  getUserByIdDb,
  updateUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserByUsernameDb,
} = require("../db/functions/user.db");
const { ErrorHandler } = require("../helpers/error");

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
      return await getUserByIdDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByEmail(email) {
    try {
      return await getUserByEmailDb(email);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async getUserByUsername(username) {
    try {
      return await getUserByUsernameDb(username);
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

      return await updateUserDb(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  async deleteUser(id) {
    try {
      return await deleteUserDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new UserService();
