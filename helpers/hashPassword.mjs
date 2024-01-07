import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, passwordHash) =>
  await bcrypt.compare(password, passwordHash);
