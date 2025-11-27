// backend/routes/jobRoutes.js
import express from "express";
import { body, param, validationResult } from "express-validator";
import Job from "../models/jobs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// =====================
// CREATE JOB (Protected)
// =====================
router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map(err => err.msg) });
      }

      const job = new Job({
        ...req.body,
        createdBy: {
          id: req.user._id,
          role: req.user.role
        }
      });

      await job.save();
      res.status(201).json({ message: "Job created successfully", job });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// =====================
// GET ALL JOBS (Public)
// =====================
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy.id", "username email"); // optional, to show creator info

    res.json({ page, limit, jobs });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// =====================
// GET SINGLE JOB (Public)
// =====================
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid Job ID")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map(err => err.msg) });
      }

      const job = await Job.findById(req.params.id).populate("createdBy.id", "username email");
      if (!job) return res.status(404).json({ message: "Job not found" });

      res.json(job);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// =====================
// UPDATE JOB (Protected, Only Owner)
// =====================
router.put(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Invalid Job ID")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map(err => err.msg) });
      }

      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });

      if (String(job.createdBy.id) !== String(req.user._id)) {
        return res
          .status(403)
          .json({ message: "Not allowed to update this job" });
      }

      Object.assign(job, req.body);
      await job.save();

      res.json({ message: "Job updated successfully", job });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// =====================
// DELETE JOB (Protected, Only Owner)
// =====================
router.delete(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Invalid Job ID")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map(err => err.msg) });
      }

      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });

      if (String(job.createdBy.id) !== String(req.user._id)) {
        return res
          .status(403)
          .json({ message: "Not allowed to delete this job" });
      }

      await job.deleteOne();
      res.json({ message: `Job "${job.title}" deleted successfully` });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

export default router;
