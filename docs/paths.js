const auth = require("./auth/index.js");
const posts = require("./post/index.js");
const users = require("./user/index.js");
const file = require("./file/index.js");

module.exports =  {
  paths: {
    ...auth,
    ...users,
    ...posts,
    ...file,
  },
};
