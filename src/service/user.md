
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const registerUser = async ({ name, email, password }) => {
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    password.length < 8
  ) {
    const error = new Error("Invalid input or password too short");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    if (error.code === 11000) {
      const conflict = new Error("Email already registered");
      conflict.statusCode = 409;
      throw conflict;
    }
    throw error;
  }
};

module.exports = { registerUser };
