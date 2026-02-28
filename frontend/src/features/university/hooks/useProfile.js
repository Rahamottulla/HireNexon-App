import { useEffect, useState } from "react";
import { getUniversityProfile } from "@/features/university/services/university.api";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUniversityProfile();
        setProfile(res);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { profile, loading, error };
};

export default useProfile;