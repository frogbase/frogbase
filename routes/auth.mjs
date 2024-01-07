import express from "express";
import {
    changePassword,
    forgetPassword,
    regenerateTokens,
    resetPassword,
    signin,
    signup,
} from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/regenerate-tokens", regenerateTokens);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

export default router;
