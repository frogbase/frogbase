const router = require("express").Router();

const auth = require("./auth");
const users = require("./users");
const file = require("./file");
const posts = require("./post");

router.use("/auth", auth);
router.use("/users", users);
router.use("/file", file);
router.use("/posts", posts);

module.exports = router;
