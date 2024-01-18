const express = require("express");
const {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../app.controllers/user.controller.js");

const verifyToken = require("../middleware/verify.token.js");

const router = express.Router();

router.use(verifyToken);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
