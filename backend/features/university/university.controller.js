// backend/features/university/university.controller.js
import User from "../user/user.model.js";
import University from "./university.model.js";
import jwt from "jsonwebtoken";

export const createUniversityProfile = async (req, res) => {
  try {
    const existing = await University.findOne({ user: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const university = await University.create({
      ...req.body,
      user: req.user.id,
    });

    // 🔥 Update role in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { role: "university" },
      { new: true }
    );

    // 🔥 Generate NEW token with updated role
    const newToken = jwt.sign(
      {
        id: updatedUser._id,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      university,
      token: newToken,   // send new token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniversityProfile = async (req, res) => {
  try {
    const university = await University.findOne({ user: req.user.id }).populate("user");
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
