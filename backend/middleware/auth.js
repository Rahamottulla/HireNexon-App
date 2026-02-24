// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../features/user/user.model.js";

const auth = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch full user from DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user)
        return res.status(401).json({ message: "User not found." });

      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden. You do not have access." });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default auth;


