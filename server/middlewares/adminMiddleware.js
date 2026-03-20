export const isAdmin = (req, res, next) => {
  try {
    if (!req.claims) {
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });
    }

    if (req.claims.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization check failed"
    });
  }
};