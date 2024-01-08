import express from "express";
import { fileUpload } from "../controllers/file.controller.mjs";
import { upload } from "../services/file.service.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.use(verifyToken);
router.post("/", upload.array('files'), fileUpload);

export default router;
