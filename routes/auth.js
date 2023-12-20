const router = require("express").Router();
const { signup, signin, regenerateTokens, forgetPassword, resetPassword, changePassword } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/regenerate-tokens", regenerateTokens);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

module.exports = router;
