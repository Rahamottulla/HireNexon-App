// frontend/src/features/candidate/hooks/useActiveWorkspace.js
import { useWorkspaceContext } from "@/features/candidate/context/WorkspaceContext";

const useActiveWorkspace = () => {
  const { activeWorkspace, switchWorkspace } = useWorkspaceContext();
  return { activeWorkspace, switchWorkspace };
};

export default useActiveWorkspace;
