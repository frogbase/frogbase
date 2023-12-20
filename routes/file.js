const router = require("express").Router();
const { upload } = require("../services/file.service");
const { fileUpload } = require("../controllers/file.controller");

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post("/", upload.array('files'), fileUpload);

module.exports = router;
