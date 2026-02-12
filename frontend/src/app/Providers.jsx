import { AuthProvider } from "@/features/auth/context/AuthContext";
import { JobProvider } from "@/features/candidate/context/JobContext";
import { ChatProvider } from "@/features/candidate/context/ChatContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <JobProvider>
        <ChatProvider>{children}</ChatProvider>
      </JobProvider>
    </AuthProvider>
  );
};

export default Providers;
