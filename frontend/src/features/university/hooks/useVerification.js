import { useEffect, useState, useCallback } from "react";
import { getPendingVerifications } from "@/features/university/services/verification.api";

const useVerification = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPendingVerifications();
      setStudents(data);
    } catch {
      setError("Failed to load verification data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { students, loading, error, refetch: fetchData };
};

export default useVerification;