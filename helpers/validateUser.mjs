export const validateEmail = (email) => {
  return typeof email === "string" && email.trim() !== "" && email.includes("@") && email.includes(".");
};

export const validatePassword = (password) => {
  return typeof password === "string" && password.trim().length >= 6;
};
