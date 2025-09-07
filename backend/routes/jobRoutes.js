import express from "express";
import { body, param, validationResult } from "express-validator";
import Job from "../models/job.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create job (protected)
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
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const job = new Job({ ...req.body, createdBy: req.user._id });
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Get all jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get single job (public)
router.get("/:id", [param("id").isMongoId()], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update job (protected - only owner)
router.put("/:id", auth, [param("id").isMongoId()], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (String(job.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to update this job" });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete job (protected - only owner)
router.delete("/:id", auth, [param("id").isMongoId()], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (String(job.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to delete this job" });
    }

    // Replace remove() with deleteOne()
    await job.deleteOne();  

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
