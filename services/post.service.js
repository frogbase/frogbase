const {
    getAllPostsDb,
    getPostByIdDb,
    createPostDb,
    updatePostDb,
    deletePostDb,
} = require("../db/functions/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {

    async createPost(post) {
        const { title, description, image } = post;
        try {
            return await createPostDb({ title, description, image });
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }
    async getAllPosts() {
        try {
            return await getAllPostsDb();
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
        const {
            id, title, description, image } = post;
        try {
            const getPost = await getPostByIdDb(id);

            if (!post.title) post.title = getPost.title;
            if (!post.description) post.description = getPost.description;
            if (!post.image) post.image = getPost.image;

            return await updatePostDb(post);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    async deletePost(id) {
        try {
            return await deletePostDb(id);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };
}

module.exports = new PostService();
