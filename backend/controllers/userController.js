import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
import { db } from "../models/index.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // 2. Find user and include password for comparison
    const user = await db.User.findOne({ where: { email } });

    // 3. Check if user exists, password is correct, and account is active
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    if (user.status === "Inactive") {
      return res.status(403).json({ message: "Your account is deactivated" });
    }

    // 4. If everything is okay, send token
    const token = signToken(user.id);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      status,
    });

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await db.User.findAll({
//       attributes: { exclude: ["password"] },
//     });

//     res.status(200).json({
//       status: "success",
//       results: users.length,
//       data: { users },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    // Update fields provided in req.body
    await user.update(req.body);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    await user.update({ status: "Inactive" });


    res.status(200).json({
      status: "success",
      message: "User account has been deactivated",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get Specific User by ID

export const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
