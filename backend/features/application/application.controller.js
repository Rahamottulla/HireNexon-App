//backend/features/application/application.controller.js
import Application from "./application.model.js";
import Job from "../job/job.model.js";
import User from "../user/user.model.js";
import CandidateProfile from "../candidate/candidateProfile.model.js";

const allowedTransitions = {
  pending: ["reviewed", "rejected"],
  reviewed: ["shortlisted", "rejected"],
  shortlisted: ["interview", "rejected"],
  interview: ["hired", "rejected"],
  hired: [],
  rejected: [],
};

// Optional filters
const { status, universityId, branch, candidateType } = req.query;

const filter = { job: jobId };

if (status) {
  filter.status = status;
}

// Fetch applications first
let applications = await Application.find(filter)
  .populate({
    path: "candidate",
    select: "username email candidateType universityId"
  })
  .lean();

// Advanced filtering (post-populate filtering)
applications = applications.filter((app) => {

  if (universityId && app.candidate.universityId?.toString() !== universityId) {
    return false;
  }

  if (candidateType && app.candidate.candidateType !== candidateType) {
    return false;
  }

  return true;
});

// Attach profile & branch filtering
const enrichedApplications = await Promise.all(
  applications.map(async (app) => {
    const profile = await CandidateProfile.findOne({ userId: app.candidate._id })
      .select("skills branch graduationYear resumeUrl currentEmployment")
      .lean();

    if (branch && profile?.branch !== branch) {
      return null;
    }

    return {
      ...app,
      profile,
    };
  })
);

const finalData = enrichedApplications.filter(Boolean);

res.status(200).json({
  success: true,
  count: finalData.length,
  data: finalData,
});

//Get My Applications
export const getMyApplications = async (req, res) => {
  try {
    // Only candidate allowed
    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can view their applications",
      });
    }

    const userId = req.user._id;

    const applications = await Application.find({ candidate: userId })
      .populate({
        path: "job",
        select: "title location jobType salary",
      })
      .populate({
        path: "company",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Employer view applicants
export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Check if user is company
    const user = await User.findById(userId);
    if (!user || user.role !== "company") {
      return res.status(403).json({ message: "Only companies can view applicants." });
    }

    // Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Ownership check
    if (job.company.toString() !== user.organizationId?.toString()) {
      return res.status(403).json({ message: "Not authorized to view this job's applicants." });
    }

    // Optional status filter
    const { status } = req.query;
    const filter = { job: jobId };
    if (status) {
      filter.status = status;
    }

    // Fetch applications
    const applications = await Application.find(filter)
      .populate({
        path: "candidate",
        select: "username email candidateType universityId"
      })
      .lean();

    // Attach candidate profile
    const enrichedApplications = await Promise.all(
      applications.map(async (app) => {
        const profile = await CandidateProfile.findOne({ userId: app.candidate._id })
          .select("skills branch graduationYear resumeUrl currentEmployment")
          .lean();

        return {
          ...app,
          profile,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enrichedApplications.length,
      data: enrichedApplications,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Shortlist API
export const shortlistApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const userId = req.user.id;

    // Check company role
    const user = await User.findById(userId);
    if (!user || user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can shortlist candidates.",
      });
    }

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Check job ownership
    const job = await Job.findById(application.job);
    if (!job || job.company.toString() !== user.organizationId?.toString()) {
      return res.status(403).json({
        message: "Not authorized to modify this application.",
      });
    }

    // Status validation
    if (!["pending", "reviewed"].includes(application.status)) {
      return res.status(400).json({
        message: `Cannot shortlist application with status '${application.status}'.`,
      });
    }

    // Update status
    application.status = "shortlisted";
    await application.save();

    res.status(200).json({
      success: true,
      message: "Candidate shortlisted successfully.",
      data: application,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Reject API
export const rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const userId = req.user.id;

    // Check company role
    const user = await User.findById(userId);
    if (!user || user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can reject candidates.",
      });
    }

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Ownership check
    const job = await Job.findById(application.job);
    if (!job || job.company.toString() !== user.organizationId?.toString()) {
      return res.status(403).json({
        message: "Not authorized to modify this application.",
      });
    }

    // Status validation
    if (application.status === "hired") {
      return res.status(400).json({
        message: "Cannot reject a hired candidate.",
      });
    }

    if (application.status === "rejected") {
      return res.status(400).json({
        message: "Application is already rejected.",
      });
    }

    // Update status
    application.status = "rejected";
    await application.save();

    res.status(200).json({
      success: true,
      message: "Candidate rejected successfully.",
      data: application,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Interview Schedule API
export const scheduleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { interviewDate, interviewMode } = req.body;

    // Role check
    if (req.user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can schedule interviews",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ownership check
    if (
      application.company.toString() !==
      req.user.organizationId?.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized for this application",
      });
    }

    // Status validation
    if (application.status !== "shortlisted") {
      return res.status(400).json({
        message: "Interview can only be scheduled for shortlisted candidates",
      });
    }

    // Update
    application.interviewDate = interviewDate;
    application.interviewMode = interviewMode;
    application.status = "interview";

    await application.save();

    res.json({
      message: "Interview scheduled successfully",
      application,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update Application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    // Only company allowed
    if (req.user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can update application status",
      });
    }

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ownership check
    if (
      application.company.toString() !==
      req.user.organizationId?.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized for this application",
      });
    }

    const currentStatus = application.status;
    if (!newStatus) {
    return res.status(400).json({
    message: "New status is required",
    });
    }

    const validStatuses = Object.keys(allowedTransitions);
    if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({
    message: "Invalid status value",
    });
    }

    // Validate transition
    const allowed = allowedTransitions[currentStatus] || [];

    if (!allowed.includes(newStatus)) {
      return res.status(400).json({
        message: `Invalid status transition from '${currentStatus}' to '${newStatus}'`,
      });
    }

    // Update
    application.status = newStatus;
    await application.save();

    res.json({
      message: "Application status updated successfully",
      application,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


