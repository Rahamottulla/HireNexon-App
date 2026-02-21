// backend/features/university/university.controller.js
import University from "./university.model.js";

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

    res.status(201).json(university);
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
