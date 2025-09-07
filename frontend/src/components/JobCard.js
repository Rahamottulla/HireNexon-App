import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="font-bold text-xl">{job.title}</h3>
      <p className="text-gray-700">
        {job.company} - {job.location}
      </p>
      <p>{job.description}</p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => navigate(`/update-job/${job._id}`)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(job._id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;


