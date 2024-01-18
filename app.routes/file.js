const express = require("express");
const { fileUpload } = require("../app.controllers/file.controller.js");
const upload = require("../services/file.service.js");

const verifyToken = require("../middleware/verify.token.js");

const router = express.Router();

router.use(verifyToken);
router.post("/", upload.array('files'), fileUpload);

module.exports = router;
