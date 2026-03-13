// backend/features/company/company.controller.js
import Company from "./company.model.js";
import WorkspaceMember from "../workspace/workspaceMember.model.js";

export const createWorkspace = async (req, res) => {
  try {
    const {
      companyName, emailDomain, orgType, industry,
      companySize, headquarters, website, description,
    } = req.body;

    const logoUrl = req.file ? "pending_upload" : null;

    if (!companyName || !orgType || !industry || !companySize || !headquarters) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // If company already exists return it
    const existing = await Company.findOne({ createdBy: req.user._id });
    if (existing) {
      return res.status(200).json({
        message:       "Workspace already exists.",
        company:       existing,
        alreadyExists: true,
      });
    }

    // Create company
    const company = await Company.create({
      name:             companyName,
      organizationType: orgType,
      industry,
      companySize,
      headquarters,
      emailDomain:  emailDomain || null,
      website:      website     || null,
      description:  description || null,
      logo:         logoUrl,
      createdBy:    req.user._id,
    });

    // ✅ Add creator as owner in workspaceMembers
    await WorkspaceMember.create({
      userId:         req.user._id,
      workspaceType:  "company",
      workspaceId:    company._id,
      workspaceModel: "Company",
      role:           "owner",
    });

    res.status(201).json({ message: "Workspace created successfully!", company });
  } catch (err) {
    console.error("createWorkspace error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne({ createdBy: req.user._id });
    if (!company) return res.status(404).json({ message: "No workspace found." });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
