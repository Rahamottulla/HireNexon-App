// backend/features/workspace/workspace.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import WorkspaceMember from "./workspaceMember.model.js";
import Company from "../company/company.model.js";
import University from "../university/university.model.js";

const router = express.Router();

// GET /api/workspaces/mine
router.get("/mine", auth(), async (req, res) => {
  try {
    const memberships = await WorkspaceMember.find({ userId: req.user._id });

    const workspaces = await Promise.all(
      memberships.map(async (m) => {
        let doc = null;

        if (m.workspaceType === "company") {
          doc = await Company.findById(m.workspaceId).select(
            "name logo description industry headquarters"
          );
        } else if (m.workspaceType === "university") {
          doc = await University.findById(m.workspaceId).select(
            "name logo description"
          );
        }

        if (!doc) return null;

        const words    = doc.name?.trim().split(" ") || [];
        const initials = words.length >= 2
          ? words[0][0] + words[1][0]
          : (words[0]?.[0] || "W");

        return {
          _id:      m._id,
          wsId:     doc._id,
          type:     m.workspaceType,
          role:     m.role,
          name:     doc.name,
          tagline:  doc.description || doc.industry || null,
          logo:     doc.logo        || null,
          initials: initials.toUpperCase(),
        };
      })
    );

    res.json({ workspaces: workspaces.filter(Boolean) });
  } catch (err) {
    console.error("GET /workspaces/mine error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
