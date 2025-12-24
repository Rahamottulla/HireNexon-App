import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { ChatProvider } from "./context/ChatContext";

// Layouts
import Layout from "./layouts/Layout/Layout";        
import HomeLayout from "./layouts/HomeLayout/HomeLayout"; 
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

// Public Pages
import Home from "./pages/Home";
import Employers from "./pages/Employers";

// Auth Pages
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifySuccess from "./pages/VerifySuccess/VerifySuccess";

// Unauthorized Page
import Unauthorized from "./pages/Unauthorized/Unauthorized";

// User Pages
import Feed from "./pages/Feed/Feed";
import Propals from "./pages/Propals/Propals";
import Communities from "./pages/Communities/Communities";
import Jobs from "./pages/Jobs/Jobs";
import LiveContests from "./pages/LiveContests/LiveContests";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";

import Dashboard from "./pages/candidate/Dashboard/Dashboard";
import HireNexonNews from "./pages/candidate/HirenexonNews/HireNexonNews";
import Announcements from "./pages/candidate/Announcements/Announcements";
import Help from "./pages/candidate/Help/Help";
import Settings from "./pages/Settings";
import ManageAccount from "./pages/ManageAccount";
import AppliedJobs from "./pages/candidate/AppliedJobs/AppliedJobs";
import Roadmaps from "./pages/candidate/Roadmaps/Roadmaps";
import NexonCv from "./pages/candidate/NexonCv/NexonCv";
import Feedback from "./pages/candidate/Feedback/Feedback";
import Interviews from "./pages/candidate/Interviews/Interviews";
import Offers from "./pages/candidate/Offers/Offers";

// Organization Pages
import OrganizationDashboard from "./pages/Organization/Dashboard";
import PostJob from "./pages/Organization/PostJob";
import ManageCandidates from "./pages/Organization/ManageCandidates";
import OrgReports from "./pages/Organization/Reports";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <BrowserRouter>
        <ChatProvider>
        
          <Routes>
            {/* Public Pages */}
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/employers" element={<Employers />} />
            </Route>

            {/* Auth Pages */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-success" element={<VerifySuccess />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            {/* Candidate Pages */}
            <Route
              path="/candidate/*"
              element={
                <ProtectedRoute role="user">
                  <Layout />
                </ProtectedRoute>
              }
            > <Route path="feed" element={<Feed />} />
              <Route path="propals" element={<Propals />} />
              <Route path="communities" element={<Communities />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="live-contests" element={<LiveContests />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="my-profile" element={<Profile />} />
              <Route index element={<Dashboard />} />
              <Route path="hirenexon-news" element={<HireNexonNews />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
              <Route path="nexoncv" element={<NexonCv />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="roadmaps" element={<Roadmaps />} />
              <Route path="offers" element={<Offers />} />
              <Route path="manage-account" element={<ManageAccount />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>

            {/* Organization Pages */}
            <Route
              path="/organization/*"
              element={
                <ProtectedRoute role="organization">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OrganizationDashboard />} />
              <Route path="dashboard" element={<OrganizationDashboard />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="manage-candidates" element={<ManageCandidates />} />
              <Route path="reports" element={<OrgReports />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ChatProvider>
        </BrowserRouter>
      </JobProvider>
    </AuthProvider>
    
  );
}

export default App;
