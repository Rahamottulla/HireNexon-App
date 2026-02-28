import { useEffect, useState } from "react";
import { getDashboardData } from "@/features/university/services/university.api";

const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDashboardData();
        setData(res);
      } catch {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, loading, error };
};

export default useDashboard;