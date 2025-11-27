// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (roles = []) => {
  if (typeof roles === "string") roles = [roles]; // single role -> array

  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden. You do not have access." });
      }

      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};

export default auth;

