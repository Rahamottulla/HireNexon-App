// backend/features/university/university.controller.js
import University from "./university.model.js";

export const createWorkspace = async (req, res) => {
  try {
    const {
      universityName, universityType, location,
      emailDomain, website, placementOfficer, departments, description,
    } = req.body;

    if (!universityName || !universityType || !location || !placementOfficer || !departments) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const existing = await University.findOne({ createdBy: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "Workspace already exists for this account." });
    }

    const logoUrl = req.file ? "pending_upload" : null;

    // departments arrives as JSON string from FormData
    let parsedDepartments = [];
    try {
      parsedDepartments = typeof departments === "string" ? JSON.parse(departments) : departments;
    } catch {
      parsedDepartments = [departments];
    }

    const university = await University.create({
      name: universityName,
      universityType,
      location,
      emailDomain: emailDomain || null,
      website: website || null,
      placementOfficer,
      departments: parsedDepartments,
      description: description || null,
      logo: logoUrl,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Workspace created successfully!", university });
  } catch (err) {
    console.error("createUniversityProfile error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const getUniversityProfile = async (req, res) => {
  try {
    const university = await University.findOne({ createdBy: req.user._id });
    if (!university) return res.status(404).json({ message: "No workspace found." });
    res.json(university);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
