import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  login,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
} from "../controllers/userController.js";

// const router = express.Router();
const userRouter = express.Router();

// Public Routes
userRouter.post("/login", login);

// Protected Routes (Requires Login)
userRouter.use(protect);

// Admin Only Routes
userRouter.use(restrictTo("Admin"));
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserById).put(updateUser);
userRouter.patch("/:id/deactivate", deactivateUser);

export default userRouter;
