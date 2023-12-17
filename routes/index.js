const router = require("express").Router();

const auth = require("./auth");
const users = require("./users");
const file = require("./file");

router.use("/auth", auth);
router.use("/users", users);
router.use("/file", file);

module.exports = router;
