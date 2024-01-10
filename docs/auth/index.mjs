
import regenerateTokens from "./regenerate.tokens.mjs";
import signin from "./signin.mjs";
import signup from "./signup.mjs";
import forgotPassword from "./forgot.password.mjs";
import resetPassword from "./reset.password.mjs";
import changePassword from "./change.password.mjs";

export default {
  "/auth/signup": {
    ...signup,
  },
  "/auth/signin": {
    ...signin,
  },
  "/auth/regenerate-tokens": {
    ...regenerateTokens,
  },
  "/auth/forgot-password": {
    ...forgotPassword,
  },
  "/auth/reset-password": {
    ...resetPassword,
  },
  "/auth/change-password": {
    ...changePassword,
  },
};
