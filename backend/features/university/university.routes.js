//backend/features/university/university.routes.js
import express from "express";
import { protect } from "../../middleware/auth.js";
import { authorizeUniversity } from "../../middleware/role.js";
import { createUniversityProfile, getUniversityProfile, getUniversityPlacementStats
} from "./university.controller.js";

const router = express.Router();

router.post("/", protect, createUniversityProfile);
router.get("/me", protect, authorizeUniversity, getUniversityProfile);
router.get("/placement-stats", auth("university"), getUniversityPlacementStats);

export default router;
