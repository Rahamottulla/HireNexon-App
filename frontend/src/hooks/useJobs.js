import { useState, useEffect } from 'react';

export const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
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
            // More jobs...
          ];
          setJobs(mockJobs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  return { jobs, loading, error };
};
