// backend/features/job/job.routes.js
import express from "express";
import { body, param, validationResult } from "express-validator";

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "./job.controller.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// CREATE JOB (Protected)
router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("companyId").notEmpty().withMessage("Company ID is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
  createJob
);

// GET ALL JOBS (Public)
router.get("/", getAllJobs);

// GET SINGLE JOB (Public)
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid Job ID")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
  getJobById
);

// UPDATE JOB (Protected)
router.put("/:id", protect, updateJob);

// DELETE JOB (Protected)
router.delete("/:id", protect, deleteJob);

export default router;
