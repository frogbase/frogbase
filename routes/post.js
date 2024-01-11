const express = require("express");
const {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} = require("../controllers/post.controller.js");

const verifyToken = require("../middleware/verify.token.js");

const router = express.Router();

router.use(verifyToken);
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
