const User = require("../models/User");
const authService = require("../services/auth.service");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

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

const refresh = async (req, res, next) => {
  try {
    const accessToken = await authService.refreshAccessToken(req.cookies.jwt);
    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    success: true,
    message: "Logged out",
  });
};

module.exports = { signUp, login, refresh, logOut };
