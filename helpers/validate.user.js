const validateEmail = (email) => {
  return typeof email === "string" && email.trim() !== "" && email.includes("@") && email.includes(".");
};

const validatePassword = (password) => {
  return typeof password === "string" && password.trim().length >= 6;
};

module.exports = {
  validateEmail,
  validatePassword,
};