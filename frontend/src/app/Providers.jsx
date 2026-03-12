import { AuthProvider } from "@/features/auth/context/AuthContext";
import { JobProvider } from "@/features/candidate/context/JobContext";
import { ChatProvider } from "@/features/candidate/context/ChatContext";
import { WorkspaceProvider } from "@/features/candidate/context/WorkspaceContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <WorkspaceProvider>
       <JobProvider>
         <ChatProvider>{children}</ChatProvider>
        </JobProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
};

export default Providers;
