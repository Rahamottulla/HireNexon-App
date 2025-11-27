import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJobs = () => {
  return useContext(JobContext);
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          salary: '$120,000 - $150,000',
          type: 'Full-time',
          posted: '2 days ago',
          logo: '/images/company-logo-1.png'
        },
        // More mock jobs...
      ];
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  };

  const value = {
    jobs,
    filters,
    loading,
    fetchJobs,
    setFilters
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
