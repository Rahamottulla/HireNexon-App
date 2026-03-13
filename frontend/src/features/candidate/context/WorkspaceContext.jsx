// frontend/src/features/candidate/context/WorkspaceContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import useWorkspaces from "@/features/candidate/hooks/useWorkspaces";

const WorkspaceContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {
  const { workspaces, loading } = useWorkspaces();
  const [activeWorkspace, setActiveWorkspace] = useState(null);

  useEffect(() => {
    if (Array.isArray(workspaces) && workspaces.length > 0 && !activeWorkspace) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [workspaces]);

  const switchWorkspace = (ws) => setActiveWorkspace(ws);

  return (
    <WorkspaceContext.Provider value={{ workspaces, activeWorkspace, switchWorkspace, loading }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => useContext(WorkspaceContext);
