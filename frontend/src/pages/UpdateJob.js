import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobs, updateJob } from "../services/api";
import Navbar from "../components/Navbar";

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const [fetching, setFetching] = useState(true); // ✅ state for initial job load

  // Load the existing job data
  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await fetchJobs();
        const jobToUpdate = response.data.find((job) => job._id === id);
        if (!jobToUpdate) {
          setError("Job not found");
        } else {
          setFormData({
            title: jobToUpdate.title,
            company: jobToUpdate.company,
            location: jobToUpdate.location,
            description: jobToUpdate.description,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch job data");
      } finally {
        setFetching(false);
      }
    };
    loadJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ Start loading
    try {
      await updateJob(id, formData);
      alert("Job updated successfully!");
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  if (fetching) {
    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-center">
          <p>Loading job data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update Job</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateJob;

