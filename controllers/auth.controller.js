const authService = require("../services/auth.service");
const mail = require("../services/mail.service");

const signup = async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.signUp(req.body);

  await mail.signupMail(user);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Account created successfully!",
    data: user,
    tokens: {
      'access-token': accessToken,
      'refresh-token': refreshToken,
    }
  });
};

const signin = async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.signin(req.body);

  await mail.signinMail(user);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User credentials are correct!",
    data: user,
    tokens: {
      'access-token': accessToken,
      'refresh-token': refreshToken,
    }
  });
};

const regenerateTokens = async (req, res) => {
  const rft = req.body["refresh-token"];
  if (!rft) throw new ErrorHandler(401, "Refresh Token missing");

  const { accessToken, refreshToken } = await authService.regenerateTokens(rft);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Tokens refreshed successfully!",
    data: {
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const { user, fpSalt } = await authService.forgetPassword(email);

  await mail.forgetPasswordMail(user, fpSalt);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "A reset password token has been sent to your registered email address.",
    data: fpSalt,
  });
};

const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;

  const { user } = await authService.resetPassword(email, token, password);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Password has been reset successfully!",
    data: user,
  });
};

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await authService.changePassword(email, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Password has been changed successfully!",
    data: user,
  });
};

module.exports = { signup, signin, regenerateTokens, forgetPassword, resetPassword, changePassword };
