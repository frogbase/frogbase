const express = require("express");
const auth = require("./auth.js");
const file = require("./file.js");
const health = require("./health.js");
const posts = require("./post.js");
const users = require("./user.js");
const swaggerUi = require("swagger-ui-express");
const docs = require("../docs/index.js");

const router = express.Router();

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/file", file);
router.use("/posts", posts);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

module.exports = router;
