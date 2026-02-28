import OverviewCards from "./OverviewCards";
import HiringAnalytics from "./HiringAnalytics";
import RecentApplicants from "./RecentApplicants";

import useDashboard from "@/features/company/hooks/useDashboard";

const Dashboard = () => {
  const { data, loading } = useDashboard();

  return (
    <div className="p-6 space-y-6">
      <OverviewCards stats={data?.stats} loading={loading} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HiringAnalytics data={data?.analytics} />
        </div>
        <RecentApplicants data={data?.recent} />
      </div>
    </div>
  );
};

export default Dashboard;
