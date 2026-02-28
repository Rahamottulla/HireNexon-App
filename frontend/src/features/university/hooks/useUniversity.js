import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/features/university/services/university.api";

const useUniversity = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAnalyticsData();
        setAnalytics(res);
      } catch {
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { analytics, loading, error };
};

export default useUniversity;