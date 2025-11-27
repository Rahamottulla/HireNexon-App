import React, { useState } from 'react';
import './JobSearch.css';

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', searchTerm, 'in', location);
  };

  return (
    <div className="job-search">
      <div className="container">
        <div className="search-card">
          <h2>Find Your Dream Job</h2>
          <p>Search through thousands of job listings</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-inputs">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="City, state, or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <button type="submit" className="search-btn">
                Search Jobs
              </button>
            </div>
          </form>
          
          <div className="quick-searches">
            <span>Popular: </span>
            <a href="#software-engineer">Software Engineer</a>
            <a href="#product-manager">Product Manager</a>
            <a href="#data-scientist">Data Scientist</a>
            <a href="#ux-designer">UX Designer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
