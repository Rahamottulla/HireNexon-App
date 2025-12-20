// src/pages/Candidate/Dashboard/Dashboard.js
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="candidate-dashboard">
      <h1 className="dashboard-title">Candidate Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your applications, explore opportunities, and manage your career journey.
      </p>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>12</h2>
          <p>Applied Jobs</p>
        </div>
        <div className="stat-card">
          <h2>3</h2>
          <p>Interviews Scheduled</p>
        </div>
        <div className="stat-card">
          <h2>2</h2>
          <p>Offers Received</p>
        </div>
        <div className="stat-card">
          <h2>5</h2>
          <p>Saved Jobs</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>✔️ Applied for <strong>Frontend Developer</strong> at Google</li>
          <li>📅 Interview scheduled with <strong>Microsoft</strong> on Oct 5, 2025</li>
          <li>⭐ You saved <strong>Data Analyst</strong> role at Amazon</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;