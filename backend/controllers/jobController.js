import Job from "../models/jobs.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    const newJob = new Job({ title, company, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server Error" });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server Error" });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server Error" });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, company, location, description },
      { new: true }
    );
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server Error" });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.json(deletedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server Error" });
  }
};
