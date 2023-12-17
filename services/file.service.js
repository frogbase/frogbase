const { ErrorHandler } = require("../helpers/error");
const { logger } = require("../utils/logger");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/"); },
    filename: function (req, file, cb) { cb(null, new Date().toISOString().replace(/:/g, "-") + "_dt_" + file.originalname); }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") return cb(null, true);
    logger.error("Invalid file type");
    return cb(new Error("Invalid file type"), false);
}
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 5 },
    // fileFilter: fileFilter,
});

module.exports = { upload };
