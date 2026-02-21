// backend/middleware/role.js
export const authorizeUniversity = (req, res, next) => {
  if (req.user.role !== "university") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
