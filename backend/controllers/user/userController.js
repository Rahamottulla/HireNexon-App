// backend/controllers/user/userController.js
import User from "../../models/user.js";

// UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, skills } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.username = name;
    if (skills) {
      user.skills = skills.split(",").map(s => s.trim());
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

