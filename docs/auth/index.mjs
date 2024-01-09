const login = require("./signin.mjs");
const signup = require("./signup.mjs");
// const checkToken = require("./check-token");
const forgotPassword = require("./forgot.password.mjs");
const resetPassword = require("./reset.password.mjs");
const refreshToken = require("./regenerate.tokens.mjs");

module.exports = {
  "/auth/login": {
    ...login,
  },
  "/auth/signup": {
    ...signup,
  },
  "/auth/forgot-password": {
    ...forgotPassword,
  },
  // "/auth/check-token": {
  //   ...checkToken,
  // },
  "/auth/reset-password": {
    ...resetPassword,
  },
  "/auth/refresh-token": {
    ...refreshToken,
  },
};
