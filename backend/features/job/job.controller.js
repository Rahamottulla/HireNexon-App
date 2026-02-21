// backend/features/job/job.controller.js
import Job from "./job.model.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, companyId, location, description, salaryRange, jobType } = req.body;

    const job = new Job({
      title,
      companyId,
      location,
      description,
      salaryRange,
      jobType,
      createdBy: req.user._id,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("companyId", "companyName")
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET SINGLE JOB
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("companyId", "companyName")
      .populate("createdBy", "username email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only owner can update
    if (String(job.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(job, req.body);
    await job.save();

    res.json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (String(job.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
