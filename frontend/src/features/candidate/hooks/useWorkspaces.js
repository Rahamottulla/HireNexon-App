// frontend/src/features/candidate/hooks/useWorkspaces.js
import { useState, useEffect } from "react";
import api from "@/shared/api/axios";

const useWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/workspaces/mine");
        setWorkspaces(Array.isArray(data.workspaces) ? data.workspaces : []);
      } catch {
        setError("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { workspaces, loading, error };
};

export default useWorkspaces;
