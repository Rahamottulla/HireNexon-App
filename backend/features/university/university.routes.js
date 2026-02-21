//backend/features/university/university.routes.js
import express from "express";
import {
createUniversityProfile,
  getUniversityProfile,
} from "./university.controller.js";
import { protect } from "../../middleware/auth.js";
import { authorizeUniversity } from "../../middleware/role.js";

const router = express.Router();

router.post("/", protect, authorizeUniversity, createUniversityProfile);
router.get("/me", protect, authorizeUniversity, getUniversityProfile);

export default router;
