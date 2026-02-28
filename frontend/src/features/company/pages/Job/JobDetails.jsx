import useJobDetails from "@/features/company/hooks/useJobDetails";

const JobDetails = ({ id }) => {
  const { job } = useJobDetails(id);

  if (!job) return null;

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {job.title}
      </h2>

      <p className="text-sm text-gray-600 mb-3">
        Department: {job.department}
      </p>

      <p className="text-sm text-gray-700">
        {job.description}
      </p>
    </div>
  );
};

export default JobDetails;