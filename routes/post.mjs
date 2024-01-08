import express from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from "../controllers/post.controller.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.use(verifyToken);
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;
