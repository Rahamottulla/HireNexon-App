import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../services/api";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  // Fetch all jobs from backend
  const getJobs = async () => {
    try {
      const response = await fetchJobs();
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // Delete job
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter((job) => job._id !== id));
        alert("Job deleted successfully!");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete job");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {jobs.length === 0 ? (
          <p>No jobs available. Create one!</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} handleDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobList;
