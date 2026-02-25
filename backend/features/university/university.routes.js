//backend/features/university/university.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import { createUniversityProfile, getUniversityProfile, getUniversityPlacementStats
} from "./university.controller.js";

const router = express.Router();

router.post("/", auth(), createUniversityProfile);
router.get("/me", auth("university"), getUniversityProfile);
router.get("/placement-stats", auth("university"), getUniversityPlacementStats);

export default router;
