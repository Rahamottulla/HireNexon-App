import React, { useState } from "react";

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm, "in", location);
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-600 to-blue-900 py-16 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Find Your Dream Job
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Search through thousands of job listings
          </p>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-700 outline-none border-b md:border-b-0 md:border-r"
              />

              <input
                type="text"
                placeholder="City, state, or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-700 outline-none border-b md:border-b-0"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition whitespace-nowrap"
              >
                Search Jobs
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <span className="font-semibold">Popular:</span>
            {[
              "Software Engineer",
              "Product Manager",
              "Data Scientist",
              "UX Designer",
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearch;
