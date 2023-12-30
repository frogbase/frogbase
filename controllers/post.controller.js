const postService = require("../services/post.service");
const { ErrorHandler } = require("../helpers/error");

const createPost = async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const result = await postService.createPost({ title, description, image, creator: req.user });
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Post created successfully!",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filter = (req.query.filter !== undefined && req.query.filter !== '') ? req.query.filter : null;
    const results = await postService.getAllPosts(page, limit, filter);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Posts retrieved successfully!",
        page: page,
        limit: limit,
        filter: filter,
        data: results,
    });
};


const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
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
        const result = await postService.updatePost({ id: req.params.id, title, description, image, updator: req.user });;

        return res.status(201).json({
            success: true,
            statusCode: 201,
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
            statusCode: 200,
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
