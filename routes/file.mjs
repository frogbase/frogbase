import express from "express";
import { fileUpload } from "../controllers/file.controller.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.use(verifyToken);
// router.post("/", upload.array('files'), fileUpload);
router.post("/", fileUpload);

export default router;
