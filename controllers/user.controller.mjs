import { ErrorHandler } from "../helpers/error.class.mjs";
import userService from "../services/user.service.mjs";

export const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully!",
    data: results,
  });
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User found!",
      data: user,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, "User not found");
  }
};

export const updateUser = async (req, res) => {
  const { username, email, name, avatar } = req.body;
  try {
    const result = await userService.updateUser({
      id: req.params.id,
      username,
      email,
      name,
      avatar,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};
