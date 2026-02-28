import { useEffect, useState } from "react";
import { getPlacementStats } from "@/features/university/services/placement.api";

const usePlacementStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPlacementStats();
        setData(res);
      } catch {
        setError("Failed to load placement stats.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, loading, error };
};

export default usePlacementStats;