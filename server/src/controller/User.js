import userModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ========================== REGISTER ==========================
export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; 

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // default user if role not provided
    }).save();

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).send({
      success: false,
      message: "Problem in register API",
    });
  }
};

// ========================== LOGIN ==========================
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid user details, please create an account",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).send({
      success: false,
      message: "Problem in login API",
    });
  }
};
