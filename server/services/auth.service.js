const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const userRegister = async ({ email, password, name }) => {
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new AppError("email alredy exist", 409);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashPassword });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("invalid email or password", 401);
  }

  const accessToken = jwt.sign(
    {
      user: {
        id: user._id,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    {
      user: {
        id: user._id,
        role: user.role,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return {
    accessToken,
    refreshToken,
    role: user.role,
  };
};

module.exports = { userRegister, userLogin };
