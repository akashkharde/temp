
const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    const status = error.statusCode || 500;

    return res.status(status).json({
      success: false,
      message: status === 500
        ? "Internal server error"
        : error.message,
    });
  }
};

module.exports = { register };
