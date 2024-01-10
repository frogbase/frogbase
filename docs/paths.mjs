import auth from "./auth/index.mjs";
import posts from "./post/index.mjs";
import users from "./user/index.mjs";

export default {
  paths: {
    ...auth,
    ...users,
    ...posts,
  },
};
