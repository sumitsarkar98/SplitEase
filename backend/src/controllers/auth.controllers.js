import pool from "../configs/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getInitials = (fullname) => {
  const words = fullname.trim().split(" ");

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Input validation
  if (!fullname || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check existing user
  const [existingUser] = await pool.execute(
    "SELECT id FROM users WHERE email = ?",
    [email],
  );

  if (existingUser.length > 0) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const initials = getInitials(fullname);

  const [result] = await pool.execute(
    "INSERT INTO users (fullname, email, password, avatar) VALUES (?, ?, ?, ?)",
    [fullname, email, hashedPassword, initials],
  );

  // Create safe response object
  const userData = {
    id: result.insertId,
    fullname,
    email,
    avatar: initials,
  };

  res
    .status(201)
    .json(new ApiResponse("User registered successfully", userData));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (users.length === 0) {
    throw new ApiError(401, "Invalid email");
  }

  const user = users[0];

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
  );

  // Remove password before sending response
  const { password: _, ...safeUser } = user;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json(
    new ApiResponse("Login successful", {
      user: safeUser,
    }),
  );
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json(new ApiResponse("Logout successful"));
});

// check secure routes
const secureMe = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const [rows] = await pool.execute(
    "SELECT id, fullname, email, avatar FROM users WHERE id = ?",
    [userId],
  );

  if (rows.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse("User fetched successfully", rows[0]));
});

export { registerUser, loginUser, logout, secureMe };
