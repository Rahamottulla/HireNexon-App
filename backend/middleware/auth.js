// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../features/user/user.model.js";

const auth = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return async (req, res, next) => {
    try {
      const cookieToken = req.cookies?.token;
      const headerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

      const token = cookieToken || headerToken;
      if (!token)
      return res.status(401).json({ message: "Access denied. No token provided." });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch full user from DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        console.log("User not found for id:", decoded.id);
        return res.status(401).json({ message: "User not found." });
      }
      console.log("User found:", user._id, "verified:", user.isVerified);

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


