const express = require("express");
const {
    changePassword,
    forgetPassword,
    regenerateTokens,
    resetPassword,
    signin,
    signup,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/regenerate-tokens", regenerateTokens);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

module.exports = router;
