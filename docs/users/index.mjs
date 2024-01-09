const getUser = require("./get.user.mjs");
const updateUser = require("./update.user.mjs");
const deleteUser = require("./delete.user.mjs");
const createUser = require("./create-user");
const getUsers = require("./get.users.mjs");

module.exports = {
  "/users": {
    ...getUsers,
    ...createUser,
  },
  "/users/{id}": {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
};
