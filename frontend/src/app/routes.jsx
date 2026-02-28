//frontend/src/app/routes.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { initGA, trackPageView } from "@/shared/utils/analytics";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";

// Layouts
import PublicLayout from "@/layouts/public/PublicLayout";
import AuthLayout from "@/layouts/auth/AuthLayout";
import CandidateLayout from "@/layouts/candidate/CandidateLayout";
import CompanyLayout from "@/layouts/company/CompanyLayout";
import UniversityLayout from "@/layouts/university/UniversityLayout";

// Route Guards
import Unauthorized from "@/features/errors/Unauthorized";
import ProtectedRoute from "@/app/ProtectedRoute";

// Public Imports
import Home from "@/features/public/pages/Home";
import Jobs from "@/features/public/pages/Jobs";
import Employers from "@/features/public/pages/ForEmployers";

// Auth Imports
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifySuccess from "@/features/email/pages/VerifySuccess";

// Candidate Imports
import Dashboard from "@/features/candidate/pages/Dashboard";
import Feed from "@/features/candidate/pages/Feed";
import Propals from "@/features/candidate/pages/Propals";
import Communities from "@/features/candidate/pages/Communities";
import Messages from "@/features/candidate/pages/Messages";
import Notifications from "@/features/candidate/pages/Notifications";
import Profile from "@/features/candidate/pages/Profile";
import News from "@/features/candidate/pages/News";
import Announcements from "@/features/candidate/pages/Announcements";
import AppliedJobs from "@/features/candidate/pages/MyApplications/AppliedJobs";
import Roadmaps from "@/features/candidate/pages/CareerHub/Roadmaps";
import NexonCv from "@/features/candidate/pages/NexonCv";
import Interviews from "@/features/candidate/pages/MyApplications/Interviews";
import Offers from "@/features/candidate/pages/MyApplications/Offers";
import Help from "@/features/candidate/pages/Help";
import Feedback from "@/features/candidate/pages/Feedback";

// Company Imports
import CompanyDashboard from "@/features/company/pages/Dashboard";
import PostJob from "@/features/company/pages/Job";
import ManageCandidates from "@/features/company/pages/ManageCandidates";
import Reports from "@/features/company/pages/Reports";

// University Imports
import UniversityDashboard from "@/features/university/pages/Dashboard";
import UniversityDepartments from "@/features/university/pages/Departments";
import UniversityPlacementStats from "@/features/university/pages/PlacementStats";
import UniversityProfile from "@/features/university/pages/Profile";
import UniversitySettings from "@/features/university/pages/Settings";
import UniversityStudents from "@/features/university/pages/Students";
import UniversityVerifyStudents from "@/features/university/pages/VerifyStudents";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Routes>
      {/* 🌍 Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/employers" element={<Employers />} />
      </Route>

      {/* 🔐 Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* 👤 Candidate */}
      <Route
        path="/candidate/*"
        element={
          <ProtectedRoute role="candidate">
            <CandidateLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="feed" element={<Feed />} />
        <Route path="propals" element={<Propals />} />
        <Route path="communities" element={<Communities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="hirenexon-news" element={<News />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path="roadmaps" element={<Roadmaps />} />
        <Route path="nexoncv" element={<NexonCv />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="offers" element={<Offers />} />
        <Route path="help" element={<Help />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* 🏢 Company */}
      <Route
        path="/company/*"
        element={
          <ProtectedRoute role="company">
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyDashboard />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-candidates" element={<ManageCandidates />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* 🎓 University */}
      <Route
       path="/university/*"
       element={
         <ProtectedRoute role="university">
           <UniversityLayout />
         </ProtectedRoute>
        }
      >
        <Route index element={<UniversityDashboard />} />
        <Route path="dashboard" element={<UniversityDashboard />} />
        <Route path="departments" element={<UniversityDepartments />} />
        <Route path="placement-stats" element={<UniversityPlacementStats />} />
        <Route path="profile" element={<UniversityProfile />} />
        <Route path="settings" element={<UniversitySettings />} />
        <Route path="students" element={<UniversityStudents />} />
        <Route path="verify-students" element={<UniversityVerifyStudents />} />
      </Route>

      <Route path="/admin" element={<AdminDashboard />} />
      {/*  Fallback */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
