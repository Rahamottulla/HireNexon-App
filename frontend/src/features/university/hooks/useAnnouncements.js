import { useEffect, useState, useCallback } from "react";
import { getAnnouncements } from "@/features/university/services/announcement.api";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      setError("Failed to fetch announcements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { announcements, loading, error, refetch: fetchData };
};

export default useAnnouncements;