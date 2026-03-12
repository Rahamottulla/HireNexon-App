// frontend/src/features/candidate/hooks/useWorkspaceRedirect.js
import { useNavigate } from "react-router-dom";

const WORKSPACE_HOME = {
  personal:   "/candidate/dashboard",
  company:    "/company/dashboard",
  university: "/university/dashboard",
};

const useWorkspaceRedirect = () => {
  const navigate = useNavigate();

  const redirectTo = (workspaceType) => {
    const path = WORKSPACE_HOME[workspaceType] || "/candidate/dashboard";
    navigate(path);
  };

  return { redirectTo };
};

export default useWorkspaceRedirect;
