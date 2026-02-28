import { useEffect, useState } from "react";
import { getDrives } from "@/features/university/services/drives.api";

const useDrives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDrives();
        setDrives(data);
      } catch {
        setError("Failed to load drives.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { drives, loading, error };
};

export default useDrives;