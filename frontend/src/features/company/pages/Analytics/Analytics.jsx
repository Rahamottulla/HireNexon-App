import ChartsSection from "./ChartsSection";
import useAnalytics from "@/features/company/hooks/useAnalytics";

const Analytics = () => {
  const { data, loading } = useAnalytics();

  return (
    <div className="p-6">
      <ChartsSection data={data} loading={loading} />
    </div>
  );
};

export default Analytics;
