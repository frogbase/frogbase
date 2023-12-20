const router = require("express").Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/post.controller");

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
