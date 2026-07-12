const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("unauthorized", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

module.exports = verifyJwt;
