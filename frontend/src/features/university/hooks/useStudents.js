import { useEffect, useState, useCallback } from "react";
import { getStudents } from "@/features/university/services/student.api";

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data.list);
      setStats(data.stats);
    } catch {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { students, stats, loading, error, refetch: fetchData };
};

export default useStudents;