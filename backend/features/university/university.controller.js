// backend/features/university/university.controller.js
import User from "../user/user.model.js";
import University from "./university.model.js";
import jwt from "jsonwebtoken";

//create university profile
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

    // Update role in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { role: "university" },
      { new: true }
    );

    // Generate NEW token with updated role
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

//Get university profile
export const getUniversityProfile = async (req, res) => {
  try {
    const university = await University.findOne({ user: req.user.id }).populate("user");
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//university placement analytics
export const getUniversityPlacementStats = async (req, res) => {
  try {
    // Only university role
    if (req.user.role !== "university") {
      return res.status(403).json({
        message: "Only universities can access placement stats",
      });
    }

    const universityId = req.user.universityId;

    if (!universityId) {
      return res.status(400).json({
        message: "University ID not found",
      });
    }

    // Aggregate stats
    const stats = await Application.aggregate([
      {
        $match: {
          university: universityId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert to object
    const result = {
      totalApplications: 0,
      shortlisted: 0,
      interview: 0,
      hired: 0,
      rejected: 0,
    };

    stats.forEach((item) => {
      result.totalApplications += item.count;
      if (result[item._id] !== undefined) {
        result[item._id] = item.count;
      }
    });

    // Placement rate
    result.placementRate =
      result.totalApplications > 0
        ? ((result.hired / result.totalApplications) * 100).toFixed(2) + "%"
        : "0%";

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

