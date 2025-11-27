import React, { useState, useEffect  } from 'react';
import {FaSearch, FaBell, FaUserFriends, FaUsers, FaUser, FaTrophy, FaEnvelope, FaRss, FaBriefcase } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import JobCard from '../../components/JobCard';
import './Jobs.css';

// ---------- Add industries array here ----------
const industries = [
  "Agriculture",
  "Automotive",
  "Banking & Finance",
  "Construction",
  "Consulting",
  "Design & Creative",
  "Education & Training",
  "Energy & Utilities",
  "Entertainment & Media",
  "FMCG (Fast-Moving Consumer Goods)",
  "Government & Public Sector",
  "Healthcare & Pharmaceuticals",
  "Hospitality & Tourism",
  "Human Resources (HR)",
  "Information Technology (IT) / Software",
  "Insurance",
  "Legal Services",
  "Logistics & Supply Chain",
  "Manufacturing",
  "Marketing & Advertising",
  "Non-Profit / NGO",
  "Oil & Gas",
  "Real Estate",
  "Retail & E-commerce",
  "Telecommunications",
  "Transportation",
  "Other"
];


const Jobs = () => {
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    locationType: '',
    experience: '',
    company: '',
    posted: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  // ---------- Filter Handlers ----------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === "posted") {
      setAppliedFilters({ ...appliedFilters, posted: value });
    }
  };

  useEffect(() => {
  setAppliedFilters(filters);
}, [filters.jobType, filters.location, filters.locationType, filters.posted, filters.experience, filters.company]);


  const clearFilters = () => {
  const defaultFilters = { jobType: '', location: '', locationType: '',  experience: '', company: '', posted: '' };
  setFilters(defaultFilters);
  setAppliedFilters({});
};
const isAnyFilterSelected = Object.values(filters).some(value => value !== '');


  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'HireNexon.',
      location: 'Kolkata',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Senior',  
      posted: '2 hours ago',
      logo: '/images/hnn.jpg'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'Mumbai',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Executive', 
      posted: '7 hours ago',
      logo: '/images/h.jpg'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataWorks',
      location: 'Delhi',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Senior', 
      posted: '12 hours ago',
      logo: '/images/y.jpg'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'ServerStack',
      location: 'Chennai',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Executive', 
      posted: '5 days ago',
      logo: '/images/company-logo-4.png'
    },
    {
      id: 5,
      title: 'UX Researcher',
      company: 'UserFirst',
      location: 'Bengaluru',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Entry', 
      posted: '8 days ago',
      logo: '/images/company-logo-5.png'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Hyderabad',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Senior', 
      posted: '7 months ago',
      logo: '/images/company-logo-6.png'
    },
    {
      id: 7,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Gurugram',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Executive', 
      posted: '3 hours ago',
      logo: '/images/company-logo-1.png'
    },
    {
      id: 8,
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'Noida',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Entry', 
      posted: '9 months ago',
      logo: '/images/company-logo-2.png'
    },
    {
      id: 9,
      title: 'Data Scientist',
      company: 'DataWorks',
      location: 'Kolkata',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Entry', 
      posted: '9 hours ago',
      logo: '/images/company-logo-3.png'
    },
    {
      id: 10,
      title: 'Backend Engineer',
      company: 'ServerStack',
      location: 'Hyderabad',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Senior', 
      posted: '9 days ago',
      logo: '/images/company-logo-4.png'
    },
    {
      id: 11,
      title: 'UX Researcher',
      company: 'UserFirst',
      location: 'Mumbai',
      locationType: 'On-site',
      type: 'Internship',
      experienceLevel: 'Entry', 
      posted: '13 days ago',
      logo: '/images/company-logo-5.png'
    },
    {
      id: 12,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Kolkata',
      locationType: 'On-site',
      type: 'Full-time',
      experienceLevel: 'Entry', 
      posted: '9 months ago',
      logo: '/images/company-logo-6.png'
    }
  ];


// Define ranges for posted filter
const postedRanges = {
  "1 hour": [0, 1],
  "6 hours": [2, 6],
  "12 hours": [7, 12],
  "1 day": [13, 24],
  "1 week": [25, 24 * 7],
  "1 month": [24 * 7 + 1, 24 * 30],
  "6 months": [24 * 30 + 1, 24 * 30 * 6], 
  "1 year": [24 * 30 * 6 + 1, 24 * 365]
};

// Convert "job.posted" text to hours ago
const getHoursAgo = (posted) => {
  posted = posted.toLowerCase();
  if (posted.includes("just now")) return 0;
  if (posted.includes("hour")) return parseInt(posted) || 1;
  if (posted.includes("day")) return (parseInt(posted) || 1) * 24;
  if (posted.includes("week")) return (parseInt(posted) || 1) * 24 * 7;
  if (posted.includes("month")) return (parseInt(posted) || 1) * 24 * 30;
  if (posted.includes("year")) return (parseInt(posted) || 1) * 24 * 365;
  return 0;
};

// Filter jobs
const filteredJobs = allJobs.filter((job) => {
  const matchesSearch =
  job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.locationType.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesJobType =
    !appliedFilters.jobType || appliedFilters.jobType === '' || job.type.toLowerCase() === appliedFilters.jobType.toLowerCase();

  const matchesLocation =
    !appliedFilters.location || appliedFilters.location === '' || job.location.toLowerCase().includes(appliedFilters.location.toLowerCase());
  
  const matchesLocationType =
  !appliedFilters.locationType || appliedFilters.locationType === '' ||
  job.locationType?.toLowerCase() === appliedFilters.locationType.toLowerCase();
  
  const matchesExperience =
  !appliedFilters.experience ||
  appliedFilters.experience === '' ||
  job.experienceLevel?.toLowerCase() === appliedFilters.experience.toLowerCase();

const matchesCompany =
  !appliedFilters.company ||
  appliedFilters.company === '' ||
  job.company?.toLowerCase().includes(appliedFilters.company.toLowerCase());

  const matchesPosted = (() => {
    if (!appliedFilters.posted || appliedFilters.posted === '') return true;

    const hoursAgo = getHoursAgo(job.posted);
    const range = postedRanges[appliedFilters.posted];
    if (!range) return true; // fallback if range not found

    const [min, max] = range;
    return hoursAgo >= min && hoursAgo <= max;
  })();

  return matchesSearch && matchesJobType && matchesLocation && matchesLocationType &&
  matchesExperience && matchesCompany && matchesPosted;
});


  return (
    <>
      <Helmet>
        <title>Jobs | HireNexon</title>
      </Helmet>

    <div className="jobs-page">
      <div className="container">
        {/* ---------- Header ---------- */}
        
<div className="jobs-welcome-scroll">
  <h1 className="jobs-heading"> Find Your Dream Job Here!</h1>
  <span className="jobs-color-blink">
  Browse through thousands of full-time, part-time, remote and hybrid opportunities 🚀
  </span>
</div>


        {/* ---------- Search & Sort ---------- */}
        <div className="jobs-top-controls">
          <div className="jobs-search-box">
          <FaSearch size={18} />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          
          <div className="sort-posted">
            <label>Sort by Posted:</label>
            <select name="posted" value={filters.posted} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="1 hour">1 hour ago</option>
              <option value="6 hours">6 hours ago</option>
              <option value="12 hours">12 hours ago</option>
              <option value="1 day">1 day ago</option>
              <option value="1 week">1 week ago</option>
              <option value="1 month">1 month ago</option>
              <option value="6 months">6 months ago</option>
              <option value="1 year">1 year ago</option>
            </select>
          </div>
        </div>

        <div className="jobs-content">
          {/* ---------- Filters Sidebar ---------- */}
          <div className="filters-sidebar">
            <h3>Filters</h3>

            <div className="filter-group">
              <label>Job Type</label>
              <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Trainee">Trainee</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <select name="location" value={filters.location} onChange={handleFilterChange}>
                <option value="">All Locations</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurugram">Gurugram</option>

              </select>
            </div>
            
            <div className="filter-group">
              <label>Location Type</label>
              <select name="locationType" value={filters.locationType} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
           
  <div className="filter-group">
  <label>Experience Level</label>
  <select
    name="experience"
    value={filters.experience}
    onChange={handleFilterChange}
  >
    <option value="">All Levels</option>
    <option value="Entry">Entry Level</option>
    <option value="Senior">Senior Level</option>
    <option value="Executive">Executive</option>
  </select>
</div>

<div className="filter-group">
  <label>Company</label>
  <select
    name="company"
    value={filters.company}
    onChange={handleFilterChange}
  >
    <option value="">All Companies</option>
    {/* Optional: You can dynamically map unique companies */}
    {[...new Set(allJobs.map((job) => job.company))].map((company, i) => (
      <option key={i} value={company}>{company}</option>
    ))}
  </select>
</div>

  {isAnyFilterSelected && (
    <button className="btn btn-primary" onClick={clearFilters}>
      Clear Filters
    </button>
  )}

  <div className="industries-section">
  <h3>Explore by Industries</h3>
  <div className="industries-list">
    {(showAllIndustries ? industries : industries.slice(0, 8)).map((industry, index) => (
      <button key={index} className="industry-btn">
        {industry}
      </button>
    ))}
  </div>
  {industries.length > 8 && (
    <button
      className="btn btn-secondary show-all-btn"
      onClick={() => setShowAllIndustries(!showAllIndustries)}
    >
      {showAllIndustries ? "Show Less" : "Show All"}
    </button>
  )}
</div>
</div>


          {/* ---------- Jobs Grid ---------- */}
          <div className="jobs-listings">
  <div className="jobs-list-wrapper">
    {filteredJobs.length > 0 ? (
      filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
    ) : (
      <p className="jobs-empty">No jobs found.</p>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
    </>
  );
};

export default Jobs;

