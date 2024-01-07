const router = require("express").Router();

const health = require("./health");
const auth = require("./auth");
const users = require("./users");
const file = require("./file");
const posts = require("./post");

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/file", file);
router.use("/posts", posts);

module.exports = router;
