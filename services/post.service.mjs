import {
    createPostDb,
    deletePostDb,
    getAllPostsDb,
    getPostByIdDb,
    updatePostDb,
} from "../db/functions/post.db.mjs";

import fs from 'fs';
import { ErrorHandler } from "../helpers/error.class.mjs";
import { logger } from "../utils/logger.mjs";

class PostService {

    async createPost(post) {
        const { title, description, image, creator } = post;
        try {
            return await createPostDb({ title, description, image, creator });
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }
    async getAllPosts(page, limit, filter) {
        try {
            return await getAllPostsDb(page, limit, filter);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async getPostById(id) {
        try {
            return await getPostByIdDb(id);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async updatePost(post) {
        const { id, title, description, image, updator } = post;
        try {
            const getPost = await getPostByIdDb(id);
            if (!getPost) throw new ErrorHandler(403, "Post not found");

            if (!post.title) post.title = getPost.title;
            if (!post.description) post.description = getPost.description;
            if (!post.image) post.image = getPost.image;
            if (post.image && getPost.image) await this.deleteFile(getPost.image)

            return await updatePostDb(post);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async deletePost(id) {
        try {
            const post = await deletePostDb(id);
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

export default new PostService();
