//backend/features/application/application.controller.js
import Application from "./application.model.js";
import Job from "../job/job.model.js";
import Notification from "../notification/notification.model.js";
import AppError from "../../utils/AppError.js";

const allowedTransitions = {
  pending: ["reviewed", "rejected"],
  reviewed: ["shortlisted", "rejected"],
  shortlisted: ["interview", "rejected"],
  interview: ["hired", "rejected"],
  hired: [],
  rejected: [],
};

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
    const { status, universityId, branch, candidateType } = req.query;

    if (req.user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can view applicants.",
      });
    }

    const job = await Job.findById(jobId).lean();
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.companyId.toString() !== req.user.companyId?.toString()) {
      return res.status(403).json({
        message: "Not authorized to view this job's applicants.",
      });
    }

    const filter = { job: jobId };
    if (status) filter.status = status;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Application.countDocuments(filter);

    let applications = await Application.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "candidate",
        select: "username email candidateType universityId",
        populate: {
          path: "profile",
          select:
            "skills branch graduationYear resumeUrl currentEmployment",
        },
      })
      .lean();

    // Advanced filtering
    applications = applications.filter((app) => {
      if (
        universityId &&
        app.candidate?.universityId?.toString() !== universityId
      )
        return false;

      if (
        candidateType &&
        app.candidate?.candidateType !== candidateType
      )
        return false;

      if (branch && app.candidate?.profile?.branch !== branch)
        return false;

      return true;
    });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
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

//Shortlist API
export const shortlistApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Check company role
    const user = req.user;
    if (!user || user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can shortlist candidates.",
      });
    }

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new AppError("Application not found", 404);
    }

    // Check job ownership
    if (application.company.toString() !== user.companyId?.toString()) {
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
    
    //success message
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

    // Check company role
    const user = req.user;
    if (!user || user.role !== "company") {
      return res.status(403).json({
        message: "Only companies can reject candidates.",
      });
    }

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new AppError("Application not found", 404);
    }

    // Ownership check
    if (application.company.toString() !== user.companyId?.toString()) {
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
    
    //success message
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
      throw new AppError("Application not found", 404);
    }

    // Ownership check
    if (application.company.toString() !== req.user.companyId?.toString()) {
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
    
    if (!interviewDate || !interviewMode) {
    return res.status(400).json({
    message: "Interview date and mode are required",
    });
    }

    // Update
    application.interviewDate = interviewDate;
    application.interviewMode = interviewMode;
    application.status = "interview";

    await application.save();
    
    //success message
    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully.",
      data: application,
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
      throw new AppError("Application not found", 404);
    }

    // Ownership check
    if (
      application.company.toString() !==
      req.user.companyId?.toString()
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

    // Create notification for candidate
    await Notification.create({
    recipient: application.candidate,
    message: `Your application status has been updated to '${newStatus}'.`,
    type: "status_update",
    });
    
    //success message
    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      data: application,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


