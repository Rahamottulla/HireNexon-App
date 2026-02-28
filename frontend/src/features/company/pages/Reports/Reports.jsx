import useReports from "@/features/company/hooks/useReports";

const Reports = () => {
  const { reports } = useReports();

  return (
    <div className="p-6 space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold">{report.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {report.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
