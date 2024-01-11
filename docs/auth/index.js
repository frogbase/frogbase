
const regenerateTokens = require("./regenerate.tokens.js");
const signin = require("./signin.js");
const signup = require("./signup.js");
const forgotPassword = require("./forgot.password.js");
const resetPassword = require("./reset.password.js");
const changePassword = require("./change.password.js");

module.exports =  {
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
