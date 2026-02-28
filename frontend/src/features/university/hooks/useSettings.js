import { useEffect, useState } from "react";
import { getUniversityProfile } from "@/features/university/services/university.api";

const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUniversityProfile();
        setSettings(res.settings);
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { settings, loading, error };
};

export default useSettings;