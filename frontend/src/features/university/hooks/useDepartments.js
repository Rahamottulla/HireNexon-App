import { useEffect, useState, useCallback } from "react";
import { getDepartments } from "@/features/university/services/department.api";

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      setDepartments(data.list);
      setStats(data.stats);
    } catch {
      setError("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { departments, stats, loading, error, refetch: fetchData };
};

export default useDepartments;