const {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");
const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
