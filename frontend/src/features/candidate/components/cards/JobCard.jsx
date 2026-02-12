import React from "react";

const JobCard = ({ job }) => {
  const {
    title,
    company,
    location,
    locationType,
    jobType,
    posted,
    logo,
  } = job;

  return (
    <div className="flex flex-col px-5 py-4 bg-white cursor-pointer transition-all duration-300 rounded-lg border-b border-gray-200 hover:bg-blue-50 hover:border-l-4 hover:border-blue-600 active:scale-[0.98]">
      <div className="flex gap-4 items-start">
        <img
          src={logo}
          alt={company}
          className="w-12 h-12 object-contain rounded-md bg-gray-50"
        />

        <div className="flex flex-col">
          <h3 className="text-blue-600 font-semibold text-lg">
            {title}
          </h3>

          <p className="text-gray-600 text-sm">
            {company} | 📍 {location} ({locationType}) | {jobType}
          </p>

          <p className="text-gray-400 text-xs">{posted}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
