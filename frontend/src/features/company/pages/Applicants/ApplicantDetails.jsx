import ApplicantTable from "./ApplicantTable";
import useApplicants from "@/features/company/hooks/useApplicants";

const Applicants = () => {
  const { applicants, loading } = useApplicants();

  return (
    <div className="p-6">
      <ApplicantTable data={applicants} loading={loading} />
    </div>
  );
};

export default Applicants;
