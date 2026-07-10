const User = require("../models/User");
const authService = require("../services/auth.service");

const signUp = async (req, res, next) => {
  try {
    const user = await authService.userRegister(req.body);
    return res.status(201).json({
      success: true,
      message: "user registerd successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await authService.userLogin(req.body);
    res.cookie("jwt", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken: result.accessToken,
      role: result.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login };
