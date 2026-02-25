import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({
          message: "You are not logged in. Please log in to get access.",
        });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists and is active

    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({
          message: "The user belonging to this token no longer exists.",
        });
    }

    if (currentUser.status === "Inactive") {
      return res.status(403).json({ message: "This account is deactivated." });
    }

    // Grant access to the protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or session expired." });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};
