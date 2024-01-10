import deleteUser from "./delete.user.mjs";
import getUser from "./get.user.mjs";
import getUsers from "./get.users.mjs";
import updateUser from "./update.user.mjs";

export default {
  "/users": {
    ...getUsers,
  },
  "/users/{id}": {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
};
