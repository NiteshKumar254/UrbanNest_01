

import User from '../models/User.js';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';

export const updateProfileController = async (req, res) => {
  try {
    // Only accept 'name' and 'password' from the request body
    const { name, password } = req.body;
    const user = await User.findById(req.user._id);

    // Validate password (if provided)
    if (password && password.length < 1) {
      return res.json({ error: "Password must be at least 1 characters long." });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        // We do not update the email
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};