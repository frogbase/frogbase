const userService = require("../services/user.service");
const { ErrorHandler } = require("../helpers/error");

const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully!",
    data: results,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    return res.status(200).json({
      success: true,
      message: "User found!",
      data: user,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, "User not found");
  }
};

const updateUser = async (req, res) => {
  const { username, email, name, avatar } = req.body;
  try {
    const result = await userService.updateUser({
      id: req.params.id,
      username,
      email,
      name,
      avatar,
    });

    return res.status(201).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
