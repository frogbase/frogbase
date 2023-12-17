const authService = require("../services/auth.service");
const mail = require("../services/mail.service");
const { ErrorHandler } = require("../helpers/error");

const signup = async (req, res) => {
  const { token, user } = await authService.signUp(req.body);

  await mail.signupMail(user);

  res.status(201).json({
    success: true,
    message: "Account created successfully!",
    data: user,
    token: token,
  });
};

const signin = async (req, res) => {
  const { token, user } = await authService.login(req.body);

  await mail.signinMail(user);

  res.status(200).json({
    success: true,
    message: "User credentials are correct!",
    data: user,
    token: token,
  });
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.body);

  res.json({
    success: true,
    message: "A reset password link has been sent to your email.",
  });
};


module.exports = {
  signup,
  signin,
  resetPassword,
};
