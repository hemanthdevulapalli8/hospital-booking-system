const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user must come from authMiddleware
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: no user found",
        });
      }

      // check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Role middleware error",
        error: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;