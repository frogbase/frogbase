const postDB = require("../db/functions/post.db.js");
const fs = require('fs');
const ErrorHandler = require("../helpers/error.class.js");
const logger = require("../utils/logger.js");

class PostService {

    async createPost(post) {
        const { title, description, image, creator } = post;
        try {
            return await postDB.createPostDb({ title, description, image, creator });
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }
    async getAllPosts(page, limit, filter) {
        try {
            return await postDB.getAll(page, limit, filter);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async getPostById(id) {
        try {
            return await postDB.getById(id);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async updatePost(post) {
        const { id, title, description, image, updator } = post;
        try {
            const getPost = await postDB.getById(id);
            if (!getPost) throw new ErrorHandler(403, "Post not found");

            if (!post.title) post.title = getPost.title;
            if (!post.description) post.description = getPost.description;
            if (!post.image) post.image = getPost.image;
            if (post.image && getPost.image) await this.deleteFile(getPost.image)

            return await postDB.update(post);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async deletePost(id) {
        try {
            const post = await postDB.delete(id);
            if (!post) throw new ErrorHandler(404, "Post not found");
            if (post.image) await this.deleteFile(post.image)
            return post;
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async deleteFile(path) {
        fs.unlink(path, (err) => {
            if (err) {
                logger.debug(`Error deleting file path: ${path} Error: ${err.message}`);
            } else {
                logger.debug(`File ${path} has been deleted successfully`);
            }
        });
    }
}

module.exports = new PostService();
