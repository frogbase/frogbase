const deleteUser = require("./delete.user.js");
const getUser = require("./get.user.js");
const getUsers = require("./get.users.js");
const updateUser = require("./update.user.js");

module.exports =  {
  "/users": {
    ...getUsers,
  },
  "/users/{id}": {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
};
