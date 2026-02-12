// src/features/candidate/context/JobContext.jsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const JobContext = createContext(null);

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch jobs (mock for now, API later)
  const fetchJobs = useCallback(async (appliedFilters = {}) => {
    setLoading(true);

    // 🔧 replace with real API later
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA",
          salary: "$120,000 - $150,000",
          type: "Full-time",
          posted: "2 days ago",
          logo: "/images/company-logo-1.png",
        },
      ];

      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const value = useMemo(
    () => ({
      jobs,
      filters,
      loading,
      fetchJobs,
      setFilters,
    }),
    [jobs, filters, loading, fetchJobs]
  );

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
