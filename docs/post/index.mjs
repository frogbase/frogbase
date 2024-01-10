import deletePost from "./delete.post.mjs";
import getPost from "./get.post.mjs";
import getPosts from "./get.posts.mjs";
import updatePost from "./update.post.mjs";

export default {
  "/posts": {
    ...getPosts,
  },
  "/posts/{id}": {
    ...getPost,
    ...updatePost,
    ...deletePost,
  },
};
