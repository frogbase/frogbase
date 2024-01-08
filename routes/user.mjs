import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.use(verifyToken);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
