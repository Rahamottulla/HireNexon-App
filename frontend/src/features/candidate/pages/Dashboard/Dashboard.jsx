const Dashboard = () => {
  return (
    <div className="p-5">
      <h1 className="mb-2 text-[26px] font-bold text-gray-900">
        Candidate Dashboard
      </h1>
      <p className="mb-6 text-base text-gray-600">
        Track your applications, explore opportunities, and manage your career journey.
      </p>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 text-center shadow-md">
          <h2 className="mb-1 text-2xl font-bold text-blue-600">12</h2>
          <p className="text-sm text-gray-600">Applied Jobs</p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center shadow-md">
          <h2 className="mb-1 text-2xl font-bold text-blue-600">3</h2>
          <p className="text-sm text-gray-600">Interviews Scheduled</p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center shadow-md">
          <h2 className="mb-1 text-2xl font-bold text-blue-600">2</h2>
          <p className="text-sm text-gray-600">Offers Received</p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center shadow-md">
          <h2 className="mb-1 text-2xl font-bold text-blue-600">5</h2>
          <p className="text-sm text-gray-600">Saved Jobs</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Recent Activity
        </h3>
        <ul className="space-y-3">
          <li className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
            ✔️ Applied for <strong>Frontend Developer</strong> at Google
          </li>
          <li className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
            📅 Interview scheduled with <strong>Microsoft</strong> on Oct 5, 2025
          </li>
          <li className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
            ⭐ You saved <strong>Data Analyst</strong> role at Amazon
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
