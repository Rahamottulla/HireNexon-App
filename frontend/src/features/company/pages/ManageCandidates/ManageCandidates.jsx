import CandidateTable from "@/features/company/components/tables/ApplicantsTable";
import useCandidates from "@/features/company/hooks/useApplicants";

const ManageCandidates = () => {
  const { candidates } = useCandidates();

  return (
    <div className="p-6">
      <CandidateTable data={candidates} />
    </div>
  );
};

export default ManageCandidates;
