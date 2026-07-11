const AppError = require("../utils/AppError");

const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("unauthorized", 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
};
module.exports = verifyRole;
