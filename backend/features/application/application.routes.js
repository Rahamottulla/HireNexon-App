//backend/features/application/application.routes.js
import express from "express";
import { getJobApplicants, getMyApplications } from "./application.controller.js";
import protect from "../../middleware/auth.js";

const router = express.Router();

router.get("/jobs/:jobId/applicants", protect, getJobApplicants);
router.patch("/:applicationId/shortlist", protect, shortlistApplication);
router.patch("/:applicationId/reject", protect, rejectApplication);
router.patch("/:id/schedule-interview", protect, scheduleInterview);
router.patch("/:id/status", auth("company"), updateApplicationStatus);
router.get("/my", auth("candidate"), getMyApplications);

export default router;
