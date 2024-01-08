import express from "express";

import auth from "./auth.mjs";
import file from "./file.mjs";
import health from "./health.mjs";
import posts from "./post.mjs";
import users from "./user.mjs";

const router = express.Router();

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/file", file);
router.use("/posts", posts);

export default router;
