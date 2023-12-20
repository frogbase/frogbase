const postService = require("../services/post.service");
const { ErrorHandler } = require("../helpers/error");

const createPost = async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const result = await postService.createPost({ title, description, image });
        res.status(201).json({
            success: true,
            message: "Post created successfully!",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const getAllPosts = async (req, res) => {
    const results = await postService.getAllPosts();
    res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: results,
    });
};


const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        return res.status(200).json({
            success: true,
            message: "Post found!",
            data: post,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, "Post not found");
    }
};

const updatePost = async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const result = await postService.updatePost({
            id: req.params.id,
            title,
            description,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Post updated successfully!",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await postService.deletePost(id);
        res.status(200).json({
            success: true,
            message: "Post deleted successfully!",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
