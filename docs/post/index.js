const deletePost = require("./delete.post.js");
const getPost = require("./get.post.js");
const getPosts = require("./get.posts.js");
const updatePost = require("./update.post.js");

module.exports = {
  "/posts": {
    ...getPosts,
  },
  "/posts/{id}": {
    ...getPost,
    ...updatePost,
    ...deletePost,
  },
};
